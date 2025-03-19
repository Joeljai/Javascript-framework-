const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

// Load JSON data
const productsPath = path.join(__dirname, 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Route to display raw JSON data
app.get('/products', (req, res) => {
  res.json(products);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server 2 is running ➔ http://localhost:${PORT}/products`);
});
