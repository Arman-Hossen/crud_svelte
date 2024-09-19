<script>
    import axios from 'axios';
    import { page } from '$app/navigation';
    import { goto } from '$app/navigation';
  
    let productId;
  
    // Extract the product ID from the URL
    productId = page.params.id;
  
    async function deleteProduct() {
      try {
        await axios.delete(`http://10.0.0.85/api/products/${productId}`);
        goto('/products');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  
    deleteProduct();
  </script>
  
  <h1 class="text-2xl font-bold mb-4">Delete Product</h1>
  
  <p>Deleting product...</p>
  