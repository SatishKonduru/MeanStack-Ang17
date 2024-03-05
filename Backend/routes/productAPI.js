const express = require('express')
const router = express.Router()
const { Product } = require('../models/productModel')
const { authenticateToken } = require('../AuthServices/authorization')
const { checkRole } = require('../AuthServices/checkRole')

//Getting all Products
router.get('/getAllProducts', authenticateToken, async(req, res) => {
    const productList = await Product.find()

    if(productList.length <= 0){
        res.status(500).send({
            message: 'No Products were found.'
        })
    }
    else{
        res.status(200).send({
            products: productList
        })
    }
})

module.exports = router