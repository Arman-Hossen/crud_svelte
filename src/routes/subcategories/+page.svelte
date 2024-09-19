<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
  
    let subcategories = [];
    let newSubcategoryName = '';
    let updatedSubcategoryName = '';
    let updateSubcategoryId = null;
  
    onMount(async () => {
      await fetchSubcategories();
    });
  
    async function fetchSubcategories() {
      try {
        const res = await axios.get('http://localhost:3000/api/subcategories');
        subcategories = res.data;
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    }
  
    async function addSubcategory() {
      try {
        const res = await axios.post('http://localhost:3000/api/subcategories', { name: newSubcategoryName });
        subcategories = [...subcategories, res.data];
        newSubcategoryName = '';
      } catch (error) {
        console.error('Error adding subcategory:', error);
      }
    }
  
    async function updateSubcategory() {
      try {
        const res = await axios.put(`http://localhost:3000/api/subcategories/${updateSubcategoryId}`, { name: updatedSubcategoryName });
        const index = subcategories.findIndex(subcategory => subcategory.id === updateSubcategoryId);
        subcategories[index] = res.data;
        updatedSubcategoryName = '';
        updateSubcategoryId = null;
      } catch (error) {
        console.error('Error updating subcategory:', error);
      }
    }
  
    async function deleteSubcategory(id) {
      try {
        await axios.delete(`http://localhost:3000/api/subcategories/${id}`);
        subcategories = subcategories.filter(subcategory => subcategory.id !== id);
      } catch (error) {
        console.error('Error deleting subcategory:', error);
      }
    }
  
    function prepareUpdate(subcategory) {
      updatedSubcategoryName = subcategory.name;
      updateSubcategoryId = subcategory.id;
    }
  </script>
  
  <h1 class="text-2xl font-bold mb-4">Subcategories</h1>
  
  {#if subcategories.length > 0}
    <ul class="list-disc list-inside mb-4">
      {#each subcategories as subcategory}
        <li class="mb-2">
          {subcategory.name}
          <button 
            class="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            on:click={() => prepareUpdate(subcategory)}
          >
            Update
          </button>
          <button 
            class="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            on:click={() => deleteSubcategory(subcategory.id)}
          >
            Delete
          </button>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Loading subcategories...</p>
  {/if}
  
  <div class="mb-4">
    <input 
      class="border p-2 rounded w-full mb-2" 
      bind:value={newSubcategoryName} 
      placeholder="New subcategory name" 
    />
    <button 
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      on:click={addSubcategory}
    >
      Add Subcategory
    </button>
  </div>
  
  {#if updateSubcategoryId !== null}
    <div class="mb-4">
      <h2 class="text-xl font-semibold mb-2">Update Subcategory</h2>
      <input 
        class="border p-2 rounded w-full mb-2" 
        bind:value={updatedSubcategoryName} 
        placeholder="Updated subcategory name" 
      />
      <button 
        class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        on:click={updateSubcategory}
      >
        Update Subcategory
      </button>
    </div>
  {/if}
  