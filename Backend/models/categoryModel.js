const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    gender: {type: String, default: 'Men'}, // Men, Women, Girl, Boy
    ageGroup: {type: String, defulat: ''}, //Adult, Teen, Kids
    style: {type: String, default: ''}, //Casual, Formal, sportsware
    size: {type: String, default: ''}, //Small, Medium, Large, Extra Large
    color: {type: String, default: ''}, //White, Black
    season: {type: String, default: ''}, //Summer, Winter
    brand: {type: String, default: ''}, //Reymonds, Puma
})

const Category = mongoose.model('Category', categorySchema, 'categories')
module.exports = {Category: Category}