const express = require('express')
// const connection = require('../connection')
const router =  express.Router()


router.get('/', (req, res) => {
    res.status(200).send('OK')
})

module.exports = router