const mongoose = require('mongoose');
const {User} =  require('./userModel')
const {Product} = require('./productModel')

const cartSchema = new mongoose.Schema({
  user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true
            },
  items: [{
                product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product' // Reference to the Product model
                },
                quantity: Number,
              
         }],
//   totalPrice: {
//                 type: Number,
//                 default: 0
//             },
  dateCreated: {
                type: Date,
                default: Date.now
            },
  status: {
            type: String,
            enum: ['Active',  'Completed'],
            default: 'Active'
        }
});

cartSchema.virtual('id').get(function() {
    return this._id.toHexString()
})
cartSchema.set('toJSON', { virtuals: true})
const Cart = mongoose.model('Cart', cartSchema, 'carts')
module.exports = {Cart: Cart}

