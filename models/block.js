const async = require('async')
const bitPony = require('bitpony')

const flappycoin = require('flappycoin')

var client = new flappycoin.Client({
    user: 'alice',
    pass: 'joe',
    port: 8332
})


var last = (amount) => {
    var grab = (acc, hash, num) => {
        if (num == 0) {
            return acc
        }

        flappycoin.cmd('getblock', hash, (err, json) => {
            acc.push(json)
            grab(acc, json.previousblockhash, num - 1)
        })
    }


    flappycoin.cmd('getbestblockhash', (err, hash) => {
        console.log(grab([],hash,amount))
    })
}


last(+process.argv[3])

