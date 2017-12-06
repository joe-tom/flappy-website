

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
            return a + v.out.reduce((a,v) => {
                return a + v.amount
            },0)
        },0) * 1e-8
        block.input_count = block.tx.reduce((a,v) => (a+v.in_count),0)
        block.output_count = block.tx.reduce((a,v) => (a+v.out_count),0)

        return block
    }) 
})