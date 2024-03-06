const express = require('express')
const router = express.Router()
const { Product } = require('../models/productModel')
const { authenticateToken } = require('../AuthServices/authorization')
const { checkRole } = require('../AuthServices/checkRole')

//Getting all Products
router.get('/getAllProducts', authenticateToken,  async(req, res) => {
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


//Adding New Product
router.post('/addProduct', authenticateToken, checkRole, async (req, res) => {
    const data  = req.body
    const product = new Product({
        name: data.name,
        description: data.description,
        price: data.price,
        countInStock: data.countInStock
        
    })
    newProduct = await product.save()
    if(!newProduct){
        return res.status(500).send({
            message: 'Something Went Wrong. Product was not added.'
        })
    }
    else{
        return res.status(200).send({
            message: 'Product Added Successfully',
            newProduct: newProduct
        })
    }
})


//Get Product By Id
module.exports = router