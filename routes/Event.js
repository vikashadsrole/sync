const router = require("express").Router();
const Event = require("../models/Event");
const cors = require("cors");

// Bring in the Event function
const {
    createEvent,
    getEvent,
    getCategory
} = require("../utils/Event");

// Create Event
router.post("/createEvent", async (req, res) => {
  //await createEvent(req.body, "user", res);
  console.log(req.body)
  await createEvent(req.body, res);
});

// Get Event
router.get("/getEvent", async (req, res) => {
  //await getEvent(req.body, "admin", res);
  await getEvent(res);
});

// Get Event
router.get("/getCategory", async (req, res) => {
    //await getEvent(req.body, "admin", res);
    //console.log(req.body.category)
    let cat=req.body.category
    await getCategory(cat,res);
  });

module.exports = router;



