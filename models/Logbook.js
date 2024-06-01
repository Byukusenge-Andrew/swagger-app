const mongoose = require('mongoose');

const logbookSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  hours: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Logbook', logbookSchema);
