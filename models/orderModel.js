const mongoose = require("mongoose"); 
  
const orderSchema= mongoose.Schema({
    name : {type: String , require},
    email: {type: String , require},
    phone: {type: String , require},
    userid : {type: String , require},  
    transactionId : {type:String , require},
    paymentId : {type:String,   require},
    orderItems : [],
    shippingAddress : {type:Object},
    orderAmount : {type:Number , require},
    isDelivered : {type:Boolean , require , default: false},
    transactionStatus : {type:Boolean , require , default: false}, 
},{
    timestamps : true
})

module.exports = mongoose.model('orders' , orderSchema)