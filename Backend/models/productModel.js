const mongoose = require('mongoose')
const { Category } = require('./categoryModel')

const productSchema = new mongoose.Schema({
    name: {type: String, default:'Casual Slim Fit'},
    description: {type: String, default:'Comfortable and stylish'},
    richDescription: {type: String, default:''},
    image: {type: String, default:''},
    images: [{type: String, default:''}],
    price: {type: Number, default: 0},
    category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category'
                },
    countInStock: {type: Number, required: true, min: 0, max: 200},
    rating: {type: Number, default: 3},
    isFeatured: {type: Boolean, default: true},
    dateCreated: {type: Date, default: Date.now}
})

const Product = mongoose.model('Product', productSchema, 'products')
module.exports = {Product: Product}