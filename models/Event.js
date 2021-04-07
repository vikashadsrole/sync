// Event create
// -Title of event
// -category from the list
// -choose promoters from the list
// -upcoming events (schedule date and time)
// -Ticket value
// -upload banner for thumbnail


const { Schema, model } = require("mongoose");

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    promoters: {
      type: String,
      required: true
    },
    promoter_image:{
      type: String,
      required: true
    },
    ticket_value: {
      type: String,
      required: true
    },
    banner:{
      type: String,
      required: true
    },
    release_date:{
      type: String,
      required: true
    },
    event_place:{
      type: String,
    },
    release_time:{
      type: String,
      required: true
    },
    video_link:{
      type: String,
      required: true
    },
    live:{
      type:Boolean
    }
  },
  { timestamps: true }
);

module.exports = model("event", EventSchema);
