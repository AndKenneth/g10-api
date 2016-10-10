const mongoose = require('mongoose');

const itemSchema = {
  name: String,
  type: String,
  category: String,
  description: String,
  modelUrl: String,
  _index: String,
  museumId: String,
  contributor: String,
  dateAdded: String,
  isTaonga: Boolean,
  content: String,
  notes: String,
  timePeriod: String,
  place: String,
};

const Item = mongoose.model('item', itemSchema);

[
  {
    name: 'Sir Edmund Hillaries Ice Axe',
    type: 'ecrm:E22_Man-Made_Object',
    category: 'mountain climbing',
    description: 'Ice axe used by Sir Edmund Hillary on first ascent of Everest, 29 May 1953\nmarkings: Claudius Simond / CHAMONIX MONT BLANC',
    modelUrl: null,
    museumIndex: 'collectionsonline-2016-08-30-1',
    museumId: 'http://api.aucklandmuseum.com/id/humanhistory/object/671988',
    contributor: 'Simond Chamonix',
    dateAdded: 'Circa 1951',
    isTaonga: false,
    content: 'Ice axe used by Sir Edmund Hillary on first ascent of Everest, 29 May 1953\nmarkings: Claudius Simond / CHAMONIX MONT BLANC',
    notes: 'This is the ice axe used by Sir Edmund Hillary during his ascent of Everest, in 1953. \"A few more whacks of the ice axe, a few weary steps, and we were on the summit of Everest (Ed Hillary, High Adventure, p208\n\nThis French Simond Chamonix ice axe acquired by Sir Edmund in 1951, and was used by him on the final ascent with Tensing Norgay, on 29 May 1953. An image on the Simond website shows Claudius Simond and Sir Edmund Hillary together at Chamonix.',
    timePeriod: 'Elizabeth II (1952 -)/House of Windsor/English reign',
    place: 'Not Nepal',
  },
  {
    name: 'Moa Skull',
    category: 'Bird',
    description: 'A moa skull',
    museumIndex: 'collectionsonline-2016-08-30-1',
    museumId: 'http://api.aucklandmuseum.com/id/humanhistory/object/64501',
    dateAdded: '02 Nov 1999',
    isTaonga: false,
    notes: 'The moa were nine species of flightless birds endemic to New Zealand. The two largest species, Dinornis robustus and Dinornis novaezelandiae, reached about 3.6 m in height with neck outstretched, and weighed about 230 kg.',
  },
].forEach((seedItem) => {
  Item.find({ name: seedItem.name }, (err, items) => {
    if (!items.length) {
      new Item(seedItem).save();
    }
  });
});


module.exports = Item;
