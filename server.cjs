const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json());

let categories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Books' }
];

let subcategories = [
  { id: 1, categoryId: 1, name: 'Mobile Phones' },
  { id: 2, categoryId: 1, name: 'Laptops' },
  { id: 3, categoryId: 2, name: 'Men\'s Clothing' },
  { id: 4, categoryId: 2, name: 'Women\'s Clothing' }
];

let products = [
  { id: 1, subcategoryId: 1, name: 'iPhone 12', price: 799 },
  { id: 2, subcategoryId: 1, name: 'Samsung Galaxy S21', price: 699 },
  { id: 3, subcategoryId: 3, name: 'T-shirt', price: 19.99 },
  { id: 4, subcategoryId: 4, name: 'Dress', price: 49.99 }
];

// Get all categories
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// Create a new category
app.post('/api/categories', (req, res) => {
  const newCategory = { id: categories.length + 1, ...req.body };
  categories.push(newCategory);
  res.json(newCategory);
});

// Update a category
app.put('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const index = categories.findIndex(category => category.id === parseInt(id));
  if (index !== -1) {
    categories[index] = { id: parseInt(id), ...req.body };
    res.json(categories[index]);
  } else {
    res.status(404).send('Category not found');
  }
});

// Delete a category
app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  categories = categories.filter(category => category.id !== parseInt(id));
  res.json({ message: 'Category deleted' });
});

// Repeat similar CRUD operations for subcategories and products

// Get all subcategories
app.get('/api/subcategories', (req, res) => {
  res.json(subcategories);
});

// Create a new subcategory
app.post('/api/subcategories', (req, res) => {
  const newSubcategory = { id: subcategories.length + 1, ...req.body };
  subcategories.push(newSubcategory);
  res.json(newSubcategory);
});

// Update a subcategory
app.put('/api/subcategories/:id', (req, res) => {
  const { id } = req.params;
  const index = subcategories.findIndex(subcategory => subcategory.id === parseInt(id));
  if (index !== -1) {
    subcategories[index] = { id: parseInt(id), ...req.body };
    res.json(subcategories[index]);
  } else {
    res.status(404).send('Subcategory not found');
  }
});

// Delete a subcategory
app.delete('/api/subcategories/:id', (req, res) => {
  const { id } = req.params;
  subcategories = subcategories.filter(subcategory => subcategory.id !== parseInt(id));
  res.json({ message: 'Subcategory deleted' });
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// Add a new product
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).send('Name and price are required');
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price
  };
  products.push(newProduct);
  res.json(newProduct);
});

// Update a product by ID
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    products[index] = {
      ...products[index],
      name: name || products[index].name,
      price: price || products[index].price
    };
    res.json(products[index]);
  } else {
    res.status(404).send('Product not found');
  }
});

// Delete a product by ID
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    products.splice(index, 1);
    res.json({ message: 'Product deleted' });
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
