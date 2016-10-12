const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/test');

const item = require('./models/item.js');
const category = require('./models/category.js');

// Find a single item from the collection by name.
app.get('/item/:name', (req, res) => {
  item.findOne({ name: req.params.name }, (err, theItem) => res.send(theItem));
});

// List all items
app.get('/items', (req, res) => {
  item.find((err, items) => res.send({ items }));
});

// Find item by category name
app.get('/items/:category', (req, res) => {
  item.find({ category }, (err, items) => res.send({ items }));
});

// Get all category names
app.get('/categories', (req, res) => {
  item.find({}, (err, items) => res.send({ categories: items.map(i => i.category) }));
});

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
