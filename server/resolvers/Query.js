import Message from '../models/user_schema.js';
const Query = {
    async loginuser(parent,args,{db},info){
        let userAll;
        //find the database(by async/await) and go back to the variable object "userAll" 
        try{
            
            userAll = await Message.find().exec();
        }catch{
            console.log("Error")
        }
        if(!args.query){
            //initialize db.users
            db.loginuser = []
            let test = userAll.map((state)=>{
                //Set the "localUser" with their variable of "userAll" object
                let localUser = {'name':state.name,'email':state.email,'password':state.password,'total_money':state.total_money}
                //push to the array "db.users"
                return db.loginuser.push(localUser);
            })
            console.log(db.loginuser);
            return db.loginuser;
        }
        return db.loginuser.filter(user => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },

    async stockcontent(parent,args,{db,pubsub},info){
        let stockAll
        try{
            stockAll = await Message.find().exec()
        }catch{
            throw new Error("Error")
        }
        console.log('stock All: ',stockAll[0].stock);
        db.stockcontent = []
        let test = stockAll.map((state)=>{
            state.stock.map((detail)=>{
                let localStock = {
                              'Name': state.name,
                              'stockName':detail.stockName,
                              'stockNumber':detail.stockNumber,
                              'stockPrice':detail.stockPrice,
                              'BuyorSell':detail.BuyorSell,
                              'fullDate':detail.fullDate}
                return db.stockcontent.push(localStock)
            })
            
            //console.log(localStock);
            //return db.stockcontent.push(localStock);

        })
        return db.stockcontent;

        //console.log(stockAll);
        //return db.stockcontent;
    }
}

export default Query;