const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const allow = require('../middleware/role');
const Product = require('../models/Product');

// Get all products
router.get('/', auth, async (req, res) => {
  try { const products = await Product.find().populate('supplier'); res.json(products); }
  catch (err) { console.error(err.message); res.status(500).send('Server error'); }
});

// Create product (admin only)
router.post('/', auth, allow('admin'), async (req, res) => {
  try { const p = new Product(req.body); await p.save(); res.json(p); }
  catch (err) { console.error(err.message); res.status(500).send('Server error'); }
});

// Update product (admin only)
router.put('/:id', auth, allow('admin'), async (req, res) => {
  try { let p = await Product.findById(req.params.id); if(!p) return res.status(404).json({message:'Not found'}); Object.assign(p, req.body); await p.save(); res.json(p); }
  catch (err) { console.error(err.message); res.status(500).send('Server error'); }
});

// Delete product (admin only)
router.delete('/:id', auth, allow('admin'), async (req, res) => {
  try { await Product.findByIdAndDelete(req.params.id); res.json({message:'Deleted'}); }
  catch (err) { console.error(err.message); res.status(500).send('Server error'); }
});

// Low stock
router.get('/low-stock/:threshold?', auth, async (req, res) => {
  try { const t = parseInt(req.params.threshold) || 5; const low = await Product.find({ stock: { $lte: t } }); res.json(low); }
  catch (err) { console.error(err.message); res.status(500).send('Server error'); }
});

module.exports = router;
