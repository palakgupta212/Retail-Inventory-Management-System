const mongoose = require('mongoose');
const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactEmail: String,
  phone: String,
  address: String
}, { timestamps: true });
module.exports = mongoose.model('Supplier', SupplierSchema);
