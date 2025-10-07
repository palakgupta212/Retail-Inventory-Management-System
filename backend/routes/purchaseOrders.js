const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const allow = require('../middleware/role');
const PurchaseOrder = require('../models/PurchaseOrder');
const Product = require('../models/Product');

// Create PO (admin/staff)
router.post('/', auth, allow(['admin','staff']), async (req, res) => {
  try {
    const { supplier, items } = req.body;
    const po = new PurchaseOrder({ supplier, items, status: 'pending' });
    await po.save();
    res.json(po);
  } catch (err) { console.error(err.message); res.status(500).send('Server error'); }
});

// Receive PO: update stock when PO is received (admin only)
router.post('/:id/receive', auth, allow('admin'), async (req, res) => {
  try {
    const po = await PurchaseOrder.findById(req.params.id).populate('items.product');
    if (!po) return res.status(404).json({message:'PO not found'});
    if (po.status === 'received') return res.status(400).json({message:'Already received'});
    for (const it of po.items) {
      const prod = await Product.findById(it.product._id);
      prod.stock += it.quantity;
      await prod.save();
    }
    po.status = 'received';
    await po.save();
    res.json(po);
  } catch (err) { console.error(err.message); res.status(500).send('Server error'); }
});

// List POs
router.get('/', auth, async (req, res) => { try { const list = await PurchaseOrder.find().populate('supplier').populate('items.product'); res.json(list);} catch (err){res.status(500).send('Server error');} });

module.exports = router;
