const Pizza = require("../models/pizzaModel")
const express = require('express')
const router = express.Router()

router.get('/getpizzas', async (req, res) => {
    try {
        const pizza = await Pizza.find({})
        res.status(200).send(pizza)
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
})

router.post('/addpizza', async(req, res) => {
    const pizza = req.body.pizza

    try {
        const newpizza = new Pizza({
            name: pizza.name,
            image: pizza.image,
            varients: ["M", "L","Xl","XXl"],
            description: pizza.description,
            category: pizza.category,
            prices: [pizza.prices]
        })
        await newpizza.save()
        res.status(200).send('Pizza added successfully')
    } catch(error) {
        res.status(400).json({message: err})
    }
    
})

router.post('/getpizzabyid', async(req, res) => {
    const pizzaid = req.body.pizzaid

    try{
        const pizza = await Pizza.find({_id: pizzaid})
        res.send(pizza)
    } catch (err) {
        res.status(500).json({message: err})
    }
})

router.post("/updatepizza", async(req, res) => {

    const editedpizza = req.body.editedpizza

    try {
        const pizza = await Pizza.findOne({_id : editedpizza._id})
        
        pizza.name= editedpizza.name,
        pizza.description= editedpizza.description,
        pizza.image= editedpizza.image,
        pizza.category=editedpizza.category,
        pizza.prices = [editedpizza.prices]

        await pizza.save()

        res.send('Pizza Details Edited successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
}); 
 

router.post("/deletepizza", async(req, res) => {

    const pizzaid = req.body.pizzaid

  try {
    await Pizza.findOneAndDelete({_id : pizzaid})
    res.send('Pizza Deleted successfully')
  } catch (error) {
      return res.status(400).json({ message: error });
  }
  
});

module.exports = router