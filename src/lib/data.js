export const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Books' }
  ];
  
  export const subcategories = [
    { id: 1, categoryId: 1, name: 'Mobile Phones' },
    { id: 2, categoryId: 1, name: 'Laptops' },
    { id: 3, categoryId: 2, name: 'Men\'s Clothing' },
    { id: 4, categoryId: 2, name: 'Women\'s Clothing' }
  ];
  
  export const products = [
    { id: 1, subcategoryId: 1, name: 'iPhone 12', price: 799 },
    { id: 2, subcategoryId: 1, name: 'Samsung Galaxy S21', price: 699 },
    { id: 3, subcategoryId: 3, name: 'T-shirt', price: 19.99 },
    { id: 4, subcategoryId: 4, name: 'Dress', price: 49.99 }
  ];
  