const flappycoin = require('flappycoin')
const async = require('async')

var last = 0
var client =  new flappycoin.Client({
    user: 'alice',
    pass: 'joe',
    port: 8332
})

var addrs = (txs, cb) => {
    async.mapLimit(txs,1,
    (tx, cb) => client.cmd('getrawtransaction', tx, 1, cb),
    (err, txs) => {
        cb(null, txs)
    })
}

var blocks = range => {
    var counter = ~~(range.length / 1000)

    async.mapLimit(range,1,
        (num, cb) => {
            if ((num % counter) == 0) {
                console.log(`${num / counter} % Done..`)
            }
            // Fetch the associated block from the number.
            client.cmd('getblockhash', num, (err, hash) => {
                client.cmd('getblock', hash, (err, block) => {
                    addrs(block.tx, cb)
                })
            })
        },
        (err, hashes) => {

        })
}


async.waterfall([
    cb => {
        client.cmd('getblockcount', (err, num) => {
            console.log(`Collecting ${num} blocks`)
            cb(null, +num)
        })
    },
    (num, cb) => {
        var range = Array.from(Array(num + 1)).map((a, i) => i).slice(last)
        blocks(range)

        cb(null, range)
    }

], (err, range) => {
    if (err) {
        throw err
    }
})
