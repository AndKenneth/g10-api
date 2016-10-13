const express = require('express');
const mongoose = require('mongoose');
const unique = require('array-unique').immutable;

const app = express();

mongoose.connect('mongodb://localhost:27017/test');

const Item = require('./models/Item.js');

// Find a single item from the collection by name.
app.get('/item/:name', (req, res) => {
  Item.findOne({ name: req.params.name }, (err, theItem) => res.send(theItem));
});

// List all items
app.get('/items', (req, res) => {
  Item.find((err, items) => res.send({ items }));
});

// Find item by category name
app.get('/items/:category', (req, res) => {
  Item.find({ 'category.title': req.params.category }, (err, items) => res.send({ items }));
});

// Get all category names
app.get('/categories', (req, res) => {
  Item.find((err, items) => {
    let categories = items.map((i) => {
      return { color: i.category.color, title: i.category.title };
    });
    categories = unique(categories);
    res.send(categories);
  });
});

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
