const authenticator = require('authenticator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const Event = require("../models/Event");
const resetPass=require("../models/ResetPassword");
const { SECRET } = require("../config");
const speakeasy = require("speakeasy");
const {
mail
} = require("../utils/mailer");


/**
 * @DESC To register the user (ADMIN, SUPER_ADMIN, USER)
 */
const userRegister = async (userDets, role, res) => {
  try {
    // Validate the username
    // let usernameNotTaken = await validateUsername(userDets.username);
    // if (!usernameNotTaken) {
    //   return res.status(400).json({
    //     message: `Username is already taken.`,
    //     success: false
    //   });
    // }

    // validate the email
    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false
      });
    }

    // Get the hashed password
    const password = await bcrypt.hash(userDets.password, 12);
    // create a new user
    const newUser = new User({
      ...userDets,
      password,
      role
    });

    await newUser.save();
    return res.status(201).json({
      message: "You are successfully registred. Please nor login.",
      success: true
    });
  } catch (err) {
    // Implement logger function (winston)
    return res.status(500).json({
      message: "Unable to create your account.",
      success: false
    });
  }
};

/**
 * 
 * @DESC To Login the user (ADMIN, SUPER_ADMIN, USER)
 */
const userLogin = async (userCreds, role, res) => {
  let { email, password } = userCreds;
  // First Check if the username is in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials.",
      success: false
    });
  }
  // We will check the role
  if (user.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
      success: false
    });
  }
  // That means user is existing and trying to signin fro the right portal
  //Now check for the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        email: user.email
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168

    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }
};

const validateUsername = async username => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

/**
 * @D
 * +ESC Passport middleware
 */
const userAuth = passport.authenticate("jwt", { session: false });

/**
 * @DESC Check Role Middleware
 */
const checkRole = roles => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();

const validateEmail = async email => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const serializeUser = user => {
  return {
    username: user.username,
    email: user.email,
    name: user.name,
    _id: user._id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
  };
};

const createEvent = async (eventData, res) => {
  const event = new Event({
    ...eventData
  });

  await event.save();
  return res.status(201).json({
    message: "You have successfully created an event",
    success: true
  });
}

const getAllEvent = async (res) => {
  all = await Event.find((err, docs) => {
    if (!err) {
      res.send(docs);
      return docs;
      //console.log(docs);
    }
    else { console.log('Error:' + JSON.stringify(err, undefined, 2)); }
  });
}


const getUserList = async (res) => {

  all = await User.find((err, docs) => {
    if (!err) {
      res.send(docs);
      return docs;
      console.log(docs);
    }
    else { console.log('Error:' + JSON.stringify(err, undefined, 2)); }
  });
  console.log(all)

};


const validateEmailReturnID = async email => {
  let user = await User.findOne({ email });
  return user._id;
  console.log(user._id)
};

const resetPassword = async (userDets, res) => {
  // validate the email
  let userID = await validateEmailReturnID(userDets.email);
  res.status(200).send(userID)
  secret = speakeasy.generateSecret({length: 8});

  const Token = authenticator.generateToken(secret.base32);
  console.log(Token)

  console.log(secret,userID)
   const newrp = new rp({
    userId:userID,
    secret:secret
  });

  await newrp.save();
}




const verify = async (userDets, res) => {
  // validate the otp
  let user_id=userDets.userId
  let token=userDets.token
  console.log(user_id,token)
  
  let user = await resetPass.findOne({ user_id});
  return user;
  console.log(user)
  
  // const {base32:secret}=rp.secret
  // const verified = speakeasy.totp.verify({ secret,
  //   encoding: 'base32',
  //   token: token });

  //   if (verified){
  //     res.send({verified:true})
  //   }else{
  //     res.send({verified:false})
  //   }
  
}

const forgetPassword=(data,res)=>{
  const {email}=data;//destructure

console.log(email)
  User.findOne({email},(err,docs)=>{
    if(err||!docs){
      return res.status(400).json({error:"User Does Not Exist"})
    }else{
      const token=jwt.sign({_id:docs._id},process.env.RESET_PASSWORD_KEY,{expiresIn:'5m'})
      mail(email,token)
    }    
  })
}



module.exports = {
  userAuth,
  checkRole,
  userLogin,
  userRegister,
  serializeUser,
  createEvent,
  getAllEvent,
  getUserList,
  resetPassword,
  verify,
  forgetPassword
};
