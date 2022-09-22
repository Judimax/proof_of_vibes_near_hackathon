export class LinkedList<T>{

  constructor(startVal:any){
      this._head.val = startVal;
      (this.list as any) = this._head
  }

  addNode= (val)=>{
      ;(this.list as any).next = {
          val,
          next:null
      }
      this.list =  (this.list as any).next
  }

  getHead= ()=>{
      return this._head
  }



  _head:{
    val:T ,
    next:any 
  }= {
      val:null as any,
      next:null as any
  }

  list= null
}