const mongoose = require("mongoose"); 
  
const paymentsSchema= mongoose.Schema({
    name : {type: String , require},
    email: {type: String , require},
    phone: {type: String , require},
    userid : {type: String , require},    
    paymentId : {type:String,   require},
    orderItems : [], 
    orderAmount : {type:Number , require},
    isDelivered : {type:Boolean , require , default: false},
    transactionStatus : {type:Boolean , require , default: false},  
    createAt: {
        type: Date,
        expires: 3600, 
        default: Date.now()
     }
})

module.exports = mongoose.model('payments' , paymentsSchema)