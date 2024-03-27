const express = require('express')
const router = express.Router()
const {User} = require('../models/userModel')
const {Product} = require('../models/productModel')
const {authenticateToken} = require('../AuthServices/authorization')
const { Cart } = require('../models/cartModel')

router.put('/addToCart/:userId', authenticateToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity || 1; // Default quantity is 1 if not provided

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity: quantity });
        }

        await cart.save();

        res.status(200).send({ message: 'Product added to cart successfully', cart: cart });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});



module.exports = router