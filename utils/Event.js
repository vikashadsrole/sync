const Event = require("../models/Event");

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


const getEvent = async (res) => {
    all = await Event.find((err, docs) => {
        if (!err) {
            res.send(docs);
            return docs;
            //console.log(docs);
        }
        else { console.log('Error:' + JSON.stringify(err, undefined, 2)); }
    });
}

const getCategory = async(data,res)=>{
    console.log(data)
    all = await Event.find( { 'category': data },(err, docs) => {
        if (!err) {
            res.send(docs);
            //return docs;
            console.log(docs);
        }
        else { console.log('Error:' + JSON.stringify(err, undefined, 2)); }
    });
  
}


module.exports = {
    createEvent,
    getEvent,
    getCategory
};