var express = require('express')
var router = express.Router()
var block = require('../models/block')

router.get('/blocks/last/:num', (req, res) => {
    var n = Math.abs(~~(req.params.num)) || 0

    if (isNaN(n)) {
        n = 10
    }

    block.best(n, blocks => {
        res.send(blocks)
    })
})

module.exports = router