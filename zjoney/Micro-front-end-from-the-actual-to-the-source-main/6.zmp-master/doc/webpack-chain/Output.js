const ChainedMap = require("./ChainedMap");
class Output extends ChainedMap{
    constructor(parent){
        super(parent);
        this.extend([
            'path',
            'filename'
        ])
    }
}
module.exports = Output