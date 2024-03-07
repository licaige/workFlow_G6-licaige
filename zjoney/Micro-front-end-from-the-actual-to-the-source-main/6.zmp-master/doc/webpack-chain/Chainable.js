
class Chainable{
    constructor(parent){
      this.parent = parent;
    }
    end(){
        return this.parent;
    }
}
module.exports = Chainable;