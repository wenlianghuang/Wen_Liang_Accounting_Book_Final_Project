import Message from '../models/user_schema.js';

const Mutation = {
    createLogIn(parent,args,{db,pubsub},info){
        const login_Name = {
            ...args.data
        }

        pubsub.publish('loginuser',{
            loginuser:{
                mutation: 'CREATED',
                data: login_Name
            }
        })

        Message.create(login_Name,()=>{
            console.log("Create the name, email, password and money total");
        })

        return login_Name;
    },
    async updateLogIn(parent,args,{db,pubsub},info){
        let {data} = args
        let contextInLogIn;
        try{
            contextInLogIn = await Message.find().exec();
            console.log("contextInLogIn: ",contextInLogIn);
        }catch{
            throw new Erro("Can not get the detail of LogIn in database")
        }
        
        let returnNewLogIn = [];
        await Promise.all(contextInLogIn.map(async (state,index)=>{
            //let datatest = JSON.stringify(data);
            //console.log("contextInLog total: ",state)
            //console.log("data: ",datatest)
            if(state.name === data.name && state.email === data.email){
                console.log("Your Account and Email is correct, please change the password");
                let tmppassword = data.password;
                returnNewLogIn = data
                await Message.updateOne({name: state.name,email: state.email,password: tmppassword},function(err,reslut){
                    if(err){
                        throw new Error(err)
                    }
                    console.log("Update Successfully");
                })
                
                console.log("New LogIn: ",data);
                
            }else{
                returnNewLogIn = state
            }
        }))
        console.log('returnNewLog: ',returnNewLogIn);
        //if(!returnNewLogIn){
        //    throw new Error("There is no suitable account and email to change password")
        //}
        
        pubsub.publish('loginuser',{
            loginuser: {
                mutation: 'UPDATED',
                data: returnNewLogIn
            }
        })
        return returnNewLogIn;
    
    },

    async deleteLogIn(parent,args,{db,pubsub},info){
        const loginIndex = db.loginuser.findIndex(login => {return login.name === args.name});
        if (loginIndex === -1){
            throw new Error("No LogIn")
        }

        const [login] = db.loginuser.splice(loginIndex,1);
        console.log("After delete: ",login.name)
        Message.deleteMany({name: login.name},()=>{
            console.log(`Delete the account ${login.name} all`);
        })
        
        pubsub.publish('loginuser',{
            loginuser: {
                mutation: 'DELETED',
                data: login
            }
        })
        return login
    },

    async createStock(parent,args,{db,pubsub},info){
        const stockdetail = {
            ...args.data
        }
        pubsub.publish('stockcontent',{
            stockcontent:{
                mutation: 'CREATED',
                data: stockdetail
            }
        })
        /*
        let stockAll;
        try{
            stockAll = await Message.find().exec()
        }catch{
            throw new Error("Error")
        }*/
        let test = await Message.findOne({'name':stockdetail.Name}).exec();
        
        console.log("Test: ",test)
        let temp = {stockName: stockdetail.stockName,
                    stockNumber: stockdetail.stockNumber,
                    stockPrice: stockdetail.stockPrice,
                    BuyorSell: stockdetail.BuyorSell,
                    fullDate: stockdetail.fullDate,}
        console.log("Temp: ",temp)
        test.stock.push(temp);
        await test.save();
        
        //await Message.findOneAndUpdate({'name':'Matt'},{'stock':[temp]})
        
        /*stockAll[1].stock.push(temp);
        console.log(stockAll[1]);
        await stockAll.save();*/
        
        //Message.save();
        /*Message.create(stockdetail,()=>{
            console.log('create stock and its detail: ',stockdetail)
        })
        */
        return stockdetail;
    }
}

export default Mutation;