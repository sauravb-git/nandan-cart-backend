const bkashConfig = require("../config/bkashConfig.json");
const createPayment = require("../action/createPayment.js");
const executePayment = require("../action/executePayment.js");
const queryPayment = require("../action/queryPayment.js");
const searchTransaction = require("../action/searchTransaction.js");
const refundTransaction = require("../action/refundTransaction.js");
const Order = require("../models/orderModel"); 
const Payments = require("../models/paymentModel"); 
const { generateEmailTamplatePaymentCompleted } = require('../utils/mail');
 
    
const checkout = async (req, res) => {
  const { amount, currentUser, cartItem } = req.body;
  try {
    console.log(req.body);
    const createResult = await createPayment(req.body); 
    console.log("Create Successful !!! ");    
      if (createResult) { 
        const neworder = new Payments({
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone,
          userid: currentUser._id,
          orderItems: cartItem,
          orderAmount: amount, 
          paymentId: createResult?.paymentID
        }) 
        neworder.save(); 
      }   
    res.json(createResult); 
  } catch (e) { 
    console.log(e);
  }
};

const bkashCallback = async (req, res) => { 
  try {
    if (req.query.status === "success") {
      let response = await executePayment(req.query.paymentID);
      console.log("response", response); 

      if (response.message) { 
        response = await queryPayment(req.query.paymentID);
      } 

      if (response.statusCode && response.statusCode === "0000") {
        console.log("Payment Successful !!! "); 
        console.log("req paymentID",response.paymentID);  
        console.log("req trxID ",response.trxID);    
        const paymentComplete = await Payments.findOne({ paymentId: response.paymentID});  
        if (response.trxID) { 
          const neworder = new Order({
            name: paymentComplete.name,
            email: paymentComplete.email,
            phone: paymentComplete.phone,
            userid: paymentComplete.userid,
            orderItems: paymentComplete.orderItems,
            orderAmount: paymentComplete.orderAmount, 
            paymentId: paymentComplete.paymentId,
            transactionId: response.trxID
          }) 
          neworder.save();
          // const paymentTrxID =  response.trxID
          // mailTransport().sendMail({
          //   from: 'paymentconformation@gmail.com',
          //   to: paymentComplete.email,
          //   subject: "nandan payment conformation",
          //   html: generateEmailTamplatePaymentCompleted(paymentComplete,paymentTrxID)
          // })  
      
        }      
        console.log(paymentComplete,"paymentComplete")  
      } else {
        res.redirect(
          `${process.env.PRO_C_MOOD+"fail"}?data=${response.statusMessage}` 
        ); 
        console.log(response.statusMessage)
      }
      // Your frontend success route
      res.redirect(
        `${process.env.PRO_C_MOOD+"success"}?data=${response.statusMessage}`
      );
    } else {
      console.log("Payment Failed !!!"); 
      // Your frontend failed route 
      console.log("req.query.paymentID:", req.query.paymentID); 
      // console.log("body:", req.body);  
      // if(req.query.paymentID){
      //   await User.findOneAndDelete({paymentId: req.query.paymentID})
      // }
      res.redirect(process.env.PRO_C_MOOD+"fail");
      console.log(response.message,"all data");
    }
  } catch (e) {
    console.log(e);
  }
};

const search = async (req, res) => {
  try {
    res.send(await searchTransaction(req.body.trxID));
  } catch (e) {
    console.log(e);
  }
};

const refund = async (req, res) => {
  try {
    res.send(await refundTransaction(req.body));
  } catch (e) {
    console.log(e);
  }
};

const refundStatus = async (req, res) => {
  try {
    res.send(await refundTransaction(req.body));
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  checkout,
  bkashCallback,
  search,
  refund,
  refundStatus,
};
