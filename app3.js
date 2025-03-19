const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = 3002;

// Middleware to parse JSON requests
app.use(express.json());

// Define file path for JSON data
const dataPath = path.join(__dirname, 'data', 'products.json');

// Helper function to read data
async function readData() {
  try {
    const rawData = await fs.readFile(dataPath, 'utf8'); // Add 'utf8' encoding
    return JSON.parse(rawData);
  } catch (error) {
    return [];
  }
}

// Helper function to save data
async function saveData(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
}

// Root route
app.get('/', (req, res) => {
  res.send(`
    <h1>CRUD Server Running</h1>
    <p>Postman to test:</p>
    <ul>
      <li>POST /products</li>
      <li>PUT /products/:id</li>
      <li>DELETE /products/:id</li>
    </ul>
  `);
});

// CREATE - POST
app.post('/products', async (req, res) => {
  try {
    const products = await readData();
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    await saveData(products);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// UPDATE - PUT
app.put('/products/:id', async (req, res) => {
  try {
    const products = await readData();
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    products[index] = { ...products[index], ...req.body };
    await saveData(products);
    res.json(products[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE
app.delete('/products/:id', async (req, res) => {
  try {
    let products = await readData();
    const id = parseInt(req.params.id);
    products = products.filter(p => p.id !== id);
    await saveData(products);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`CRUD Server running → http://localhost:${PORT}`);
});
