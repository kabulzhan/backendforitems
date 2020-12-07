const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const indexSchema = new Schema({
  name: { type: String, required: true, unique: true },
  counter: { type: Number, required: true },
});

const ModelClass = mongoose.model("index", indexSchema);

module.exports = ModelClass;
