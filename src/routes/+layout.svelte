<script>
    import "../app.css";
</script>
<style>
    .button {
      @apply bg-blue-500 text-white font-bold py-2 px-4 rounded m-2;
    }
  </style>
  
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl font-bold mb-6">Welcome to the Home Page</h1>
    <div class="flex">
      <a href="/categories" class="button">Categories</a>
      <a href="/subcategories" class="button">Subcategories</a>
      <a href="/products" class="button">Products</a>
    </div>
    <slot></slot> 
  </div>