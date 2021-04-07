const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const mail=async (email,message) =>{
    console.log(email,message)
    const tokenembed=`http://localhost:5000/api/users/changepass/${message}`;

    //const msg="<h1>"+message+"</h1>"
    const msg='<style>input{width:80%;margin:auto;}</style><form method="POST" action='+tokenembed+'><label>Password:</label><br><input type="text" id="password" name="password" ><br><label >Confirm Password:</label><br><input type="text" id="confirmpassword" name="confirmpassword" ><br><br><input type="submit" value="Submit"></input></form> '

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "localhost",
      port: 587,
      secure: false, // true for 465, false for other ports
      service: "Gmail",
      auth: {
          user: "devilps0@gmail.com",
          pass: "@Devilhitman1"
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: message, // plain text body
      html: msg, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  module.exports = {
    mail
  };