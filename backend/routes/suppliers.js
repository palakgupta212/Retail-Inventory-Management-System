const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const allow = require('../middleware/role');
const Supplier = require('../models/Supplier');

// CRUD suppliers (admin)
router.get('/', auth, async (req, res) => { try { const s = await Supplier.find(); res.json(s);} catch (err){res.status(500).send('Server error');} });
router.post('/', auth, allow('admin'), async (req, res) => { try { const s = new Supplier(req.body); await s.save(); res.json(s);} catch (err){res.status(500).send('Server error');} });
router.put('/:id', auth, allow('admin'), async (req, res) => { try { let s = await Supplier.findById(req.params.id); Object.assign(s, req.body); await s.save(); res.json(s);} catch (err){res.status(500).send('Server error');} });
router.delete('/:id', auth, allow('admin'), async (req, res) => { try { await Supplier.findByIdAndDelete(req.params.id); res.json({message:'Deleted'});} catch (err){res.status(500).send('Server error');} });

module.exports = router;
