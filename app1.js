// Import Express framework
const express = require('express');
const app = express();
const PORT = 3000;

// Root route
app.get('/', (req, res) => {
  res.send(`
    <h1>Our Team Members</h1>
    <p>Joel Jaison,Navneeth PM,Aswin Ciby</p>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server 1 is running ➔ http://localhost:${PORT}`);
});
