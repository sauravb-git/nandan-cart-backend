const bkashConfig = require("../config/bkashConfig.json");
const createPayment = require("../action/createPayment.js");
const executePayment = require("../action/executePayment.js");
const queryPayment = require("../action/queryPayment.js");
const searchTransaction = require("../action/searchTransaction.js");
const refundTransaction = require("../action/refundTransaction.js");
const Order = require("../models/orderModel"); 

const checkout = async (req, res) => {
  const { amount, currentUser, cartItem } = req.body;
  try {
    console.log(req.body);
    const createResult = await createPayment(req.body); 
    console.log("Create Successful !!! ");

    // if (createResult) {
    //   const neworder = new Order({
    //     name: currentUser.name,
    //     email: currentUser.email,
    //     userid: currentUser._id,
    //     orderItems: cartItem,
    //     orderAmount: amount, 
    //     transactionId: createResult?.paymentID,
    //   }) 
    //   neworder.save();
    // }

    console.log(createResult?.paymentID,"payment ID"); 
    console.log(currentUser,"name"); 
    res.json(createResult);

  } catch (e) {
    console.log(e);
  }
};

const bkashCallback = async (req, res) => {
  const { amount, currentUser, cartItems } = req.body;
  try {
    if (req.query.status === "success") {
      let response = await executePayment(req.query.paymentID);
      console.log("response", response); 

      if (response.message) {
        response = await queryPayment(req.query.paymentID);
      }

      if (response.statusCode && response.statusCode === "0000") {
        console.log("Payment Successful !!! ");
        // save response in your db
      } else {
        res.redirect(
          `${bkashConfig.frontend_fail_url}?data=${response.statusMessage}`
        );
      }
      // Your frontend success route
      res.send(
        `${bkashConfig.frontend_success_url}?data=${response.statusMessage}`
      );
    } else {
      console.log("Payment Failed !!!");
      // Your frontend failed route
      console.log("req:", req.query);
      console.log(bkashConfig.frontend_fail_url);
      res.redirect(bkashConfig.frontend_fail_url);
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
