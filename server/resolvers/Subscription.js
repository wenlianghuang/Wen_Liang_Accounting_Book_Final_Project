const Subscription = {
    loginuser: {
        subscribe(parent,args,{pubsub},info){
            return pubsub.asyncIterator('loginuser');
        }
    },
    
    stockcontent:{
        subscribe(parent,args,{pubsub},info){
            return pubsub.asyncIterator('stockcontent')
        }
    }
}

export default Subscription;