const async = require('async')
const bitPony = require('bitpony')

const flappycoin = new require('flappycoin').Cient({
    user: 'alice',
    pass: 'joe',
    port: 8332
})


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


