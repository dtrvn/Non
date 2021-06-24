const mongoose = require("mongoose");

const PersonInShiftSchema = new mongoose.Schema({
  shiftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shift",
  },
  dateFrom: {
    type: Date,
    required: true,
  },
  dateTo: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  personNumber: {
    type: Number,
    required: true,
  },
});

module.exports = PersonInShift = mongoose.model(
  "personInShift",
  PersonInShiftSchema
);
