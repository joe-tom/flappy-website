const async = require('async')
const bitPony = require('bitpony')

const flappycoin = require('flappycoin')

var client = new flappycoin.Client({
    user: 'alice',
    pass: 'joe',
    port: 8332
})


var last = (amount) => {
    var grab = (acc, hash, cb) => {
        flappycoin.cmd('getblock', hash, (err, json) => {
            acc.push(json)
            cb(null, acc, json.previousblockhash)
        })
    }
    var fall = [
        cb => {
            flappycoin.cmd('getbestblockhash', (err, hash) => {
                cb(null, [], hash)
            })
        },
    ]

    for(var i = amount; i--;) {
        fall.push(grab)
    }

    return new Promise((resolve, reject) => {
        async.waterfall(fall, (err, final, lasthash) => {
            console.log(final)
        })
    })
}


last(+process.argv[3])

