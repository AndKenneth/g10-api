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

Item.remove({});

[
  {
    name: 'Sir Edmund Hillaries Ice Axe',
    type: 'ecrm:E22_Man-Made_Object',
    category: { title: 'mountain climbing' },
    description: 'Ice axe used by Sir Edmund Hillary on first ascent of Everest, 29 May 1953\nmarkings: Claudius Simond / CHAMONIX MONT BLANC',
    modelUrl: null,
    museumIndex: 'collectionsonline-2016-08-30-1',
    museumId: 'http://api.aucklandmuseum.com/id/humanhistory/object/671988',
    contributor: 'Simond Chamonix',
    dateAdded: 'Circa 1951',
    isTaonga: false,
    notes: 'This is the ice axe used by Sir Edmund Hillary during his ascent of Everest, in 1953. \"A few more whacks of the ice axe, a few weary steps, and we were on the summit of Everest (Ed Hillary, High Adventure, p208\n\nThis French Simond Chamonix ice axe acquired by Sir Edmund in 1951, and was used by him on the final ascent with Tensing Norgay, on 29 May 1953. An image on the Simond website shows Claudius Simond and Sir Edmund Hillary together at Chamonix.',
    timePeriod: 'Elizabeth II (1952 -)/House of Windsor/English reign',
    place: 'Nepal',
  },
  {
    name: 'Moa Skull',
    category: { title: 'Skeleton' },
    description: 'A moa skull',
    museumIndex: 'collectionsonline-2016-08-30-1',
    museumId: 'http://api.aucklandmuseum.com/id/humanhistory/object/64501',
    dateAdded: '02 Nov 1999',
    isTaonga: false,
    notes: 'The moa were nine species of flightless birds endemic to New Zealand. The two largest species, Dinornis robustus and Dinornis novaezelandiae, reached about 3.6 m in height with neck outstretched, and weighed about 230 kg.',
    prefabName: 'moaskull',
  },
  {
    name: 'Hawkbill Sea Turtle',
    category: { title: 'Marine' },
    description: 'A sea turtle',
    prefabName: 'turtle',
    notes: 'The hawksbill sea turtle is a critically endangered sea turtle belonging to the family Cheloniidae. It is the only extant species in the genus Eretmochelys.',
    dateAdded: '03 Sep 2003',
  },
  {
    name: 'Lion Skull',
    category: { title: 'Skeleton' },
    description: 'A lion skull',
    prefabName: 'lionskull',
    notes: 'The lion is one of the big cats in the genus Panthera and a member of the family Felidae. The commonly used term African lion collectively denotes the several subspecies in Africa.',
    dateAdded: '21 Jan 1993',
  },
  {
    name: 'Little blue penguin',
    category: { title: 'Marine' },
    description: 'A small blue penuin',
    prefabName: 'penguin',
    notes: 'The little penguin (Eudyptula minor) is the smallest species of penguin. It grows to an average of 33 cm (13 in) in height and 43 cm (17 in) in length, though specific measurements vary by subspecies.[2][3] It is found on the coastlines of southern Australia and New Zealand, with possible records from Chile.',
    dateAdded: '22 Feb 2013',
  },
].forEach((seedItem) => {
  Item.find({ name: seedItem.name }, (err, items) => {
    if (!items.length) {
      new Item(seedItem).save();
    }
  });
});


module.exports = Item;
