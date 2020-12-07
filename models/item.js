const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  indexForAll: { type: Number, required: true },
  indexForCategory: { type: Number, required: true },
});

const ModelClass = mongoose.model("item", itemSchema);

module.exports = ModelClass;
