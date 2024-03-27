const mongoose = require('mongoose');
const {Order} = require('./orderModel')
const {Product} =  require('./productModel')
const {Cart} = require('./cartModel')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  apartment: {
    type: String,
    default: ''
  },
  street: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  zip: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: 'user',
    required: false
  },
  image: {
    type: String,
    default: ''
  },
  wishlist: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }],
  cartItems: [{
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Cart'
            }],
  orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
          }],
  resetToken: { 
    type: String 
  }
});

userSchema.virtual('id').get(function() {
    return this._id.toHexString()
})
userSchema.set('toJSON', { virtuals: true})
const User = mongoose.model('User', userSchema, 'users');
module.exports = { User: User };
