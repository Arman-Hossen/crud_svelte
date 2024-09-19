<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
  
    let categories = [];
  
    onMount(async () => {
      await fetchCategories();
    });
  
    async function fetchCategories() {
      try {
        const res = await axios.get('http://10.0.0.85/api/categorys');
        categories = res.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  
    async function deleteCategory(id) {
      try {
        await axios.delete(`http://10.0.0.85/api/categorys/${id}`);
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
          <!-- Link to update page -->
          <a href={`/categories/update/${category.id}`} class="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
    Update
          </a>
  
          <a href={`/categories/delete/${category.id}`}
            class="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            on:click|preventDefault={() => deleteCategory(category.id)}
          >
            Delete
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Loading categories...</p>
  {/if}
  
  <a href="/categories/add"
    class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
  >
    Add Category
  </a>
  