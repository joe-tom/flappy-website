var express = require('express')
var router = express.Router()


router.get('/:query', (req, res, next) => {
    var q = req.param.query

    // Check for address.
    if (q.substr(0,1) == 'F') {
        res.redirect('/address/', )
        return
    }

})


module.exports = router
