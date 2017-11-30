const async = require('async')
const flappycoin = require('flappycoin')
const bitPony = require('bitpony')


var last = (amount) => {

    return new Promise((resolve, reject) => {
        async.waterfall([
            cb => {
                flappycoin.cmd('getbestblockhash', cb)
            },
            (hash, cb) => {
                flappycoin.cmd('getblock', hash, (err, json) => {
                    console.log(err,json)
                })
            }
        ])
    })
}


