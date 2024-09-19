

<script>
    import axios from 'axios';
    import { page } from '$app/stores';
  
    let newCategoryName = '';
  
    async function addCategory() {
      try {
        const res = await axios.post('http://10.0.0.85/api/categorys', { title: newCategoryName });
        page.set('/categories'); // Navigate back to categories list after adding
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  </script>
  
  <h1 class="text-2xl font-bold mb-4">Add Category</h1>
  
  <div class="mb-4">
    <input 
      class="border p-2 rounded w-full mb-2" 
      bind:value={newCategoryName} 
      placeholder="New category name" 
    />
    <button 
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      on:click={addCategory}
    >
      Add Category
    </button>
  </div>
  