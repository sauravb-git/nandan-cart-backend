const nodemailer = require('nodemailer')

exports.generateOTP = () => {
    let otp = "";
    for(let i = 0; i <= 3; i++){
     const randval = Math.round(Math.random() * 9);
     otp = otp + randval;
    }
    return otp;
}
 
exports.mailTransport = () =>  nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
      user: process.env.MAILTRAP_USERNAMEBV,
      pass: process.env.MAILTRAP_PASSWORDBV
}}) 

 
exports.generateEmailTamplate = (mailName,OTP) => {
     return `<!doctype html>
     <html>
       <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       </head>
       <body style="font-family: sans-serif;">
          <p>Hey ${mailName}!</p>
          <p>Please verify your email.</p>
           <div style="display: block;" class="main">
           <p>We use this to make your account secure and easy to access.</p>  
           <h1>Your email verification OTP is: ${OTP}</h1>
           </div> 
         <p>Thanks,</p>
         <p>The Team Nandan</p>
       </body>
     </html>`
}


exports.generateEmailTamplateSuccess = (mailName) => {
  return `<!doctype html>
  <html>
    <head>
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body style="font-family: sans-serif;">
      <p>Hey ${mailName}!</p>
      <p>your email address has been successfully verified</p> 
      <p>Thanks,</p>
      <p>The Team Nandan</p>
    </body>
  </html>`
}


exports.generateEmailTamplateResetpassword = (mailName,RandomBytes,mailUserId) => {
  return `<!doctype html>
  <html>
    <head>
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body style="font-family: sans-serif;">
      <p>Hey ${mailName}!</p>
      <p>We're sorry to hear that you're having trouble with logging in to Nandan. We've received a 
      message that you've forgotten your password. If this was you, you can get straight back into 
      your account or reset your password now</p>  
      <a href="${process.env.PRO_C_MOOD}reset-password/${RandomBytes}/${mailUserId}"
      class="button button-primary" target="_blank" rel="noopener" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 
      'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
       position: relative; -webkit-text-size-adjust: none; border-radius: 4px; color: #fff; display: inline-block;
        overflow: hidden; text-decoration: none; background-color: #2d3748; border-bottom: 8px solid #2d3748; 
        border-left: 18px solid #2d3748; border-right: 18px solid #2d3748; border-top: 8px solid #2d3748;">
        Reset Password</a> 
      <p>Thanks,</p>
      <p>The Team Nandan</p>
    </body>
  </html>`
}

exports.generateEmailTamplateResetpasswordSuccess = (mailName) => {
  return `<!doctype html>
  <html>
    <head>
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body style="font-family: sans-serif;">
      <p>Hey ${mailName}!</p>
      <p>password reset successfully!</p>  
      <p>please login to your account with new password</p>  
      <p>Thanks,</p>
      <p>The Team Nandan</p>
    </body>
  </html>`
}
 

exports.generateEmailTamplatePaymentCompleted = (mailName) => {
  return `<!doctype html>
  <html>
    <head>
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body style="font-family: sans-serif;">
      <p>Hey ${"mailName"}!</p>
      <p>payment completed successfully!</p>  
      <p>please login to your account with new password</p>  
      <p>Thanks,</p>
      <p>The Team Nandan</p>
    </body>
  </html>`
}

exports.generateEmailTamplateOrderCompleted = (mailName) => {
  return `<!doctype html>
  <html>
    <head>
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body style="font-family: sans-serif;">
      <p>Hey ${"mailName"}!</p>
      <p>order completed successfully!</p>  
      <p>please login to your account with new password</p>  
      <p>Thanks,</p>
      <p>The Team Nandan</p>
    </body>
  </html>`
}
 