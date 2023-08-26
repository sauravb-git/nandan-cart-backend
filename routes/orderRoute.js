const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")("sk_test_51KYU3PC86U4zuuJvOIBdtXk7DmviwfSOSwKHr7P2KniOf65abqNEq2iw1z2XxW43gPpnPqEEcobDQO7KxRYudZnL005m4gRfs9");
const Order = require("../models/orderModel"); 
const {BkashGateway} = require('bkash-payment-gateway');
 

router.post("/placeorder" , async (req, res) => {
  const { subtotal, currentUser, cartItems } = req.body;

  try {

    // const customer = await stripe.customers.create({
    //   email: token.email,
    //   source: token.id,
    // });

    // const payment = await stripe.charges.create(
    //   {
    //     amount: subtotal * 100,
    //     currency: "inr"
    //     customer: customer.id,
    //     receipt_email: token.email,
    //   },
    //   {
    //     idempotencyKey: uuidv4(),
    //   }
    // );

    // if (payment) {
    //   const neworder = new Order({
    //     name: currentUser.name,
    //     email: currentUser.email,
    //     userid: currentUser._id,
    //     orderItems: cartItems,
    //     orderAmount: subtotal,
    //     shippingAddress: {
    //       street: token.card.address_line1,
    //       city: token.card.address_city,
    //       country: token.card.address_country,
    //       pincode: token.card.address_zip,
    //     },
    //     transactionId: payment.source.id,
    //   }); 
    //   neworder.save();
       
      

      if (result) {
        const neworder = new Order({
          // name: currentUser.name,
          // email: currentUser.email,
          // userid: currentUser._id,
          orderItems: cartItems,
          orderAmount: subtotal,
          // shippingAddress: {
          //   street: token.card.address_line1,
          //   city: token.card.address_city,
          //   country: token.card.address_country,
          //   pincode: token.card.address_zip,
          // },
          // transactionId: payment.source.id,
        });

        neworder.save(); 
   
    } else {
      res.send("Payment failed");
    }
  
    return res.status(201).json(result); 

  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});



router.post("/getuserorders", async (req, res) => {
  const { userid } = req.body;
  try {
    const orders = await Order.find({ userid: userid }).sort({ _id: -1 });
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/getallorders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deliverorder", async (req, res) => {
  const orderid = req.body.orderid;
  try {
    const order = await Order.findOne({ _id: orderid });
    order.isDelivered = true;
    await order.save();
    res.send("Order Delivered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;




 // const bkash = new BkashGateway({
    //   baseURL: process.env.BKASH_BASEURL,
    //   key: process.env.BKASH_API_KEY,
    //   secret: process.env.BKASH_API_SECRET,
    //   username: process.env.BKASH_USERNAME,
    //   password: process.env.BKASH_PASSWORD,
    // });


    // const result = await bkash.createPayment({  
		// 	intent: 'sale',
    //   amount: 100,
    //   currency: "inr",
    //   customer: "55", 
		// });

    // if (result) {
    //   const neworder = new Order({
    //     name: currentUser.name,
    //     email: currentUser.email,
    //     userid: currentUser._id,
    //     orderItems: cartItems,
    //     orderAmount: subtotal,
    //     shippingAddress: {
    //       street: token.card.address_line1,
    //       city: token.card.address_city,
    //       country: token.card.address_country,
    //       pincode: token.card.address_zip,
    //     },
    //     transactionId: payment.source.id,
    //   });

    //   neworder.save();

    //   return res.status(201).json(result);
    // } else {
    //   res.send("Payment failed");
    // }
