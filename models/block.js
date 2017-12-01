const async = require('async')
const bitPony = require('bitpony')

const flappycoin = require('flappycoin')

var client = new flappycoin.Client({
    user: 'alice',
    pass: 'joe',
    port: 8332
})


var last = (amount) => {
    var grab = (acc, hash, num, cb) => {
        if (num <= 0) {
            cb(acc)
            return acc
        }

        client.cmd('getblock', hash, (err, json) => {
            acc.push(json)
            grab(acc, json.previousblockhash, num - 1, cb)
        })
    }


    client.cmd('getbestblockhash', (err, hash) => {
        grab([],hash,amount, a => {
            console.log(a)
        })
    })
}


last(~~process.argv[2])

