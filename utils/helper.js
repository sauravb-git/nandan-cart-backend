// const crypto = require('crypto'); 

exports.sendError = (res,error ,status=401) =>{
   res.status(status).json({ success: false, error });
} 
 
exports.createRandomBytes = () => {
   return new Promise((resolve, reject) => {
     crypto.randomBytes(30, (err, buffer) => {
       if (err) {
         reject(err);
       } else {
         resolve(buffer.toString('hex'));
       }
     });
   });
 }

