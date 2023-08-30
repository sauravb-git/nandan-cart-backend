const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel"); 
 

router.post("/placeorder" , async (req, res) => {
  const { subtotal, currentUser, cartItems } = req.body;

  try { 

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




 