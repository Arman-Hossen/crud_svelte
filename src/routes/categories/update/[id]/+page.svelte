<!-- src/routes/categories/update/[id]/+page.svelte -->

<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
  
    let category = null;
    let updatedCategoryName = '';
    let r = '';
  
    onMount(async () => {
      await fetchCategory($page.params.id);
    });
  
    async function fetchCategory(id) {
      try {
        const res = await axios.get(`http://10.0.0.85/api/categorys/${id}`);
        category = res.data;
        r = category.category
        updatedCategoryName = r.title;
        console.log(category)
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    }
  
    async function updateCategory() {
      try {
        await axios.put(`http://10.0.0.85/api/categorys/${category.id}`, {
          title: updatedCategoryName,
        });
        alert('Category updated successfully');
        // Redirect back to categories list
        page.set('/categories');
      } catch (error) {
        console.error('Error updating category:', error);
      }
    }
  </script>
  
  {#if category}
    <h1 class="text-2xl font-bold mb-4">Update Category</h1>
    <div class="mb-4">
      <input
        class="border p-2 rounded w-full mb-2"
        bind:value={updatedCategoryName}
        placeholder="Updated category name"
      />
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        on:click={updateCategory}
      >
        Update Category
      </button>
    </div>
  {:else}
    <p>Loading category...</p>
  {/if}
  