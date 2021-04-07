// Event create
// -Title of event
// -category from the list
// -choose promoters from the list
// -upcoming events (schedule date and time)
// -Ticket value
// -upload banner for thumbnail


const { Schema, model } = require("mongoose");

const resetPass = new Schema(
  {
    userId:{
        type: String,
        required: true  
    },
    secret: {
        ascii:{
            type: String,
            required: true
        },
        hex:{
            type: String,
            required: true
        },
        base32:{
            type: String,
            required: true
        },
        otpauth_url:{
            type: String,
            required: true
        }
    }
  },
  { timestamps: true }
);

module.exports = model("resetPass", resetPass);
