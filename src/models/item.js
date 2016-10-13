const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaOptions = {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
};

const itemSchema = new Schema({
  name: String,
  type: String,
  category: { title: String },
  description: String,
  modelUrl: String,
  _index: String,
  museumId: String,
  contributor: String,
  dateAdded: String,
  isTaonga: Boolean,
  notes: String,
  timePeriod: String,
  place: String,
  prefabName: String,
}, schemaOptions);

/* eslint no-bitwise: ["error", { "allow": ["<<", "&"] }] */

itemSchema.virtual('category.color').get(function () {
  let hash = 0;
  [...this.category.title].forEach((letter) => {
    hash = letter.charCodeAt(0) + ((hash << 5) - hash);
  });
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '00000'.substring(0, 6 - c.length) + c;
});

itemSchema.virtual('color').get(function () {
  let hash = 0;
  [...this.name].forEach((letter) => {
    hash = letter.charCodeAt(0) + ((hash << 5) - hash);
  });
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '00000'.substring(0, 6 - c.length) + c;
});

const Item = mongoose.model('item', itemSchema);

const testItems = require('./tests/item-test.js');

Item.remove({}, () => {
  testItems.forEach((seedItem) => {
    Item.find({ name: seedItem.name }, (err, items) => {
      if (!items.length) {
        new Item(seedItem).save();
      }
    });
  });
});

module.exports = Item;
