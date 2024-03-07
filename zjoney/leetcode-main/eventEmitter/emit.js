class Event{
  constructor(){
    this.events=Object.create(null)
  }
  on(name, fn){
   if(!this.events[name]){
     this.events[name]=[]
   }
   this.events[name].push(fn)
   return this
  }
  emit(name, arg){
    if(!this.events[name]){
      return this
    }
    this.events[name].forEach(fn=>fn.call(this, arg))
  }
  off(name, fn){
    if(!this.events[name]){
      return this
    }
    if(!fn){
      this.events[name] = null
      return this
    }
    let index = this.events[name].indexOf(fn)
    if(index > -1){
      return this.events[name].splice(index, 1)
    }
    return this
    // 
  }
  
}