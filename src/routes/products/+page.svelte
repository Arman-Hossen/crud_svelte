<!-- src/routes/categories/+page.svelte -->

<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
  
    let categories = [];
  
    onMount(async () => {
      await fetchCategories();
    });
  
    async function fetchCategories() {
      try {
        const res = await axios.get('http://10.0.0.85/api/categories');
        categories = res.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  
    async function deleteCategory(id) {
      try {
        await axios.delete(`http://10.0.0.85/api/categories/${id}`);
        categories = categories.filter(category => category.id !== id);
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  </script>
  
  <h1 class="text-2xl font-bold mb-4">Categories</h1>
  
  {#if categories.length > 0}
    <ul class="list-disc list-inside mb-4">
      {#each categories as category}
        <li class="mb-2">
          {category.title}
          <a href={`/categories/update/${category.id}`} class="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            Update
          </a>
          <button 
            class="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            on:click={() => deleteCategory(category.id)}
          >
            Delete
          </button>
        </li>
      {/each}
    </ul>
  {:else}
    <p>No categories found or loading error occurred.</p>
  {/if}
  
  <a href="/categories/add"
    class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
  >
    Add Category
  </a>
  