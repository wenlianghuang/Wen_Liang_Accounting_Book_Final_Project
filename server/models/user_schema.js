import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true]
    },
    
    password: {
        type: String,
        required: [true]
    },
    total_money:{
        type: Number,
        required: [true]
    },
    stock: [{
            stockName: String,
            stockNumber: String,
            stockPrice: Number,
            BuyorSell: String,
            fullDate: String,
    }]
    
    
}, {
        collection: 'mattcollection'
    })

const UserSchema = mongoose.model('User',userSchema);
export default UserSchema;
