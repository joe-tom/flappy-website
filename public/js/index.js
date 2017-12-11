

var Blocks = new Vue({
    el: '#block__table',
    data: {
        blocks: []
    }
})





fetch('/api/blocks/last/10')
.then(req => req.json())
.then(json => {
    Blocks.blocks = json.map(block => {
        block.fees = block.tx.reduce((a,v) => {
            return a + v.vout.reduce((a,v) => {
                return a + v.value
            },0)
        },0)

        block.input_count = block.tx.reduce((a,v) => (a+v.vin.length),0)
        block.output_count = block.tx.reduce((a,v) => (a+v.vout.length),0)

        return block
    }) 
})