const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');  // Authentication middleware

const router = express.Router();

// Create a product (requires authentication)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const product = new Product({
      name,
      price,
      quantity,
      merchantId: req.merchantId,  // Use the merchant's ID from the token
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all products for the authenticated merchant
router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ merchantId: req.merchantId });
    res.json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update a product (requires authentication)
router.put('/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: productId, merchantId: req.merchantId },
      updates,
      { new: true }
    );

    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a product (requires authentication)
router.delete('/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOneAndDelete({ _id: productId, merchantId: req.merchantId });

    if (!product) return res.status(404).send('Product not found');
    res.send('Product deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
