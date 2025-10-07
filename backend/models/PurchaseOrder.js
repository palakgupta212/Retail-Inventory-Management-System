const mongoose = require('mongoose');
const PurchaseOrderSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    unitPrice: Number
  }],
  status: { type: String, enum: ['pending','received','cancelled'], default: 'pending' }
}, { timestamps: true });
module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
