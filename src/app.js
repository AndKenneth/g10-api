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
  item.find((err, items) => res.send(items));
});

// Find item by category name
app.get('/items/:category', (req, res) => {
  category.find({ name: req.params.category }, (err, categories) => {
    if (categories.length) {
      res.status(404).send('Sorry, I can\'t find that one!');
    } else {
      item.find({ category: req.params.category }, (err2, items) => res.send(items));
    }
  });
});


// Get all category names
app.get('/categories', (req, res) => {
  category.find((err, categories) => res.send(categories));
});

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
