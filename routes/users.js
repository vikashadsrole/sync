const router = require("express").Router();
const User = require("../models/User");
const cors = require("cors");

// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
  createEvent,
  getAllEvent,
  getUserList,
  resetPassword,
  verify,
  forgetPassword

} = require("../utils/Auth");

// Users Registeration Route
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});

// Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// Super Admin Registration Route
router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

// Users Login Route
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

// Super Admin Login Router


router.post("/login-super-admin", async (req, res) => {
  
  await userLogin(req.body, "superadmin", res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// Users Protected Route
router.get(
  "/user-protectd",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    return res.json("Hello User");
  }
);

// Admin Protected Route
router.get(
  "/admin-protectd",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-protectd",
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    return res.json("Hello Super Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-and-admin-protectd",
  userAuth,
  checkRole(["superadmin", "admin"]),
  async (req, res) => {
    return res.json("Super admin and Admin");
  }
);

//creating Events
router.post('/createEvent',async (req,res)=>{
  await createEvent(req.body,res)
})

//geting all events
router.get('/getEvents',async (req,res)=>{
  await getAllEvent(res)
})

//geting all users
router.get('/getUserList',async (req,res)=>{
  await getUserList(res)
})

router.post('/resetPassword',async (req,res)=>{
  await resetPassword(req.body,res)

})

router.post("/verify", async (req, res) => {
  await verify(req.body, res);
});

router.post('/mail', async(req,res)=>{
  await forgetPassword(req.body,res)
})

router.post('/:id',async (req,res)=>{
  console.log(req.params)
  res.send('What the hell')
})

router.post('/changepass/:secret',(req,res)=>{
  console.log(req.params)
  console.log(req.body)
  console.log(req.body.password)
  console.log(req.body.confirmpassword)
  if(req.body.password==req.body.confirmpassword){
    res.send("Password Changed")
  }
  if(req.body.password!=req.body.confirmpassword){
    res.send("Password Does Not Match")
  }
})
module.exports = router;



