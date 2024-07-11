// const express = require('express');
import express from 'express';
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

// Define your routes
app.get('/server', (req, res) => {
  res.setHeader('X-Total-Count', '100'); // Example usage
  res.json({ data: 'your data' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
