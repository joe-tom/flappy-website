const async = require('async')
const bitPony = require('bitpony')
const flappycoin = require('flappycoin')

var client = new flappycoin.Client({
    user: 'alice',
    pass: 'joe',
    port: 8332
})

var best  = (n, cb) => {
    var fetch = (hash, n, acc) => {
        if (n <- 0) {
            return cb && cb(acc)
        }
        block(hash, json => {
            fetch(json.previousblockhash, n - 1, acc.concat(json))
        })
    }

    client.cmd('getbestblockhash', (err, hash) => {
        fetch(hash, n, [])
    })
}

var block = (hash, cb) => {
    client.cmd('getblock', hash, (err, json) => {
        async.map(json.tx, (tx, cb) => {
            client.cmd('getrawtransaction', tx, cb)
        }, (err, txs) => {
            json.tx = txs.map(tx => bitPony.tx.read(tx))
            cb (json)
        })
    })
}

module.exports = {
    best,
    block
}