const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  merchantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant', required: true },
});

module.exports = mongoose.model('Product', ProductSchema);
