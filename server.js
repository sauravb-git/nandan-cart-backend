const express = require('express')
require('dotenv').config();  
const app = express()
const db = require('./db'); 
var cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors())

app.use(bodyParser.json());


const bkashRouter = require("./routes/bkashRouter.js");
const pizzaRoutes = require('./routes/pizzaRoutes')
const userRoutes = require('./routes/user')
const ordersRoute = require('./routes/orderRoute')

app.use(express.json()) 
const port = process.env.PORT || 8000


app.use("/api/bkash", bkashRouter);
app.use('/api/pizzas', pizzaRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders' , ordersRoute) 
const path = require('path');
const res = require('express/lib/response');

 
 
app.get("/",(req,res) => {
  res.send('working')
})

app.listen(port, () => 
console.log(`Example app listening on port port! ${port}`))