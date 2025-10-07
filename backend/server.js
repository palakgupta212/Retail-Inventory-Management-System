const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(()=>console.log('MongoDB connected'))
  .catch(err=>console.error('MongoDB connection error:', err.message));

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const supplierRoutes = require('./routes/suppliers');
const poRoutes = require('./routes/purchaseOrders');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/purchase-orders', poRoutes);

app.get('/', (req,res)=>res.send('Retail Inventory API running'));

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
