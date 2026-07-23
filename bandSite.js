const mongoose = require("mongoose");

const bandSiteSchema = new mongoose.Schema({
  showTitle: { type: String, required: true },
  showDate: { type: Date, required: true },
  venue: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});
module.exports = mongoose.model("bandSite", bandSiteSchema);
