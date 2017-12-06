var express = require('express');
var router = express.Router();
var block = require('../models/block')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' })
})

router.get('/block/:hash', (req, res) => {
    block.block(req.params.hash, block => {
        console.log(block)
        res.render('block',{block})
    })
})

module.exports = router;
