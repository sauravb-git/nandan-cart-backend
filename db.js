const mongoose = require('mongoose')

var mongoURL = 'mongodb+srv://nandanofficial:nandanofficial1234@pizza-app.pmhdzv8.mongodb.net/?retryWrites=true&w=majority'


// var mongoURL = 'mongodb://localhost:27017'
    
mongoose.connect(mongoURL, {useUnifiedTopology: true,  useNewUrlParser: true})

var db = mongoose.connection

db.on('connected', ()=>{
    console.log('Mongo DB connection successful')
})

 

module.exports = mongoose