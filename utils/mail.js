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
 





exports.generateEmailTamplatePaymentCompleted = (paymentComplete,paymentTrxID) => {
  return `<!DOCTYPE html>
  <html>
  <head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <style type="text/css">
  
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; }
  
  img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  table { border-collapse: collapse !important; }
  body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
  
  
  a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
  }
  
  @media screen and (max-width: 480px) {
      .mobile-hide {
          display: none !important;
      }
      .mobile-center {
          text-align: center !important;
      }
  }
  div[style*="margin: 16px 0;"] { margin: 0 !important; }
  </style>
  <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
  
  
  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
  For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them. 
  </div>
  
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
          <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
          
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
              <tr>
                  <td align="center" valign="top" style="font-size:0; padding: 20px;" bgcolor="#1D4544">
  
              
                  <div style="display:inline-block; max-width:100%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
                      <table align="left" border="0" cellpadding="0" cellspacing="0"  style="max-width:300px;">
                          <tr>
                              <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 10px;">
                                  <table cellspacing="0" cellpadding="0" border="0" align="right">
                                      <tr> 
                                          <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">
                                              <a href="#" target="_blank" style="color: #ffffff; text-decoration: none;"><img src="https://nandanofficial.com/static/media/TLogo.9acc07a7.png" 
                                                  width="100" height="100" style="display: block; border: 0px;"/></a>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </div>  
                  </td>
              </tr>
              <tr>
                <td width="100%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                  hey ${paymentComplete.name} 
                </td> 
             </tr>
              <tr>
                  <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                      <tr>
                          <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                              <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                              <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                  Thank You For Your Order!
                              </h2>
                          </td>
                      </tr>
                      <tr>
                          <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                              <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                                   
                              </p>
                          </td>
                      </tr>
                      <tr>
                          <td align="left" style="padding-top: 20px;">
                              <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                  <tr>
                                      <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                         Transaction ID #
                                      </td>
                                      <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                         ${paymentTrxID}
                                      </td>
                                   </tr>
                                  <tr> 
                                      <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                          Purchased Item (${paymentComplete?.orderAmount / 300})
                                      </td>
                                      <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                          ${paymentComplete?.orderAmount} TK.
                                      </td>
                                  </tr> 
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td align="left" style="padding-top: 20px;">
                              <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                  <tr>
                                      <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                          TOTAL
                                      </td>
                                      <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                         ${paymentComplete?.orderAmount} TK.
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
                  
                  </td>
              </tr>
               <tr>
                  <td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;">
                      <tr>
                          <td align="center" valign="top" style="font-size:0;">
                              <div style="display:inline-block; max-width:100%; min-width:240px; vertical-align:top; width:100%;">
  
                                  <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                      <tr>
                                          <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                              <p style="font-weight: 800;">Delivery Address</p>
                                              <p>Nondonkanon Buddhist Temple</p> 
                                          </td>
                                      </tr>
                                  </table>
                              </div> 
                          </td>
                      </tr>
                  </table>
                  </td>
              </tr> 
              <tr>
                  <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;"> 
                      <tr>
                          <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                              <p style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;">
                                  If you have any questions or need assistance please contact 01865989803 (Sujoy Barua) managing director of Nandan. 
                              </p>
                              <p style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;">  
                                  Best regards 
                              </p>
                              <p style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;"> 
                                  Team Nandan 
                              </p>
                          </td>
                      </tr>
                  </table>
                  </td>
              </tr>
          </table>
          </td>
      </tr>
  </table>
      
  </body>
  </html>`
}

 