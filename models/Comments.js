const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema ({
    name: {type: String},
    urlImage: {type: String},
    comment: {type: String},
    token: {type: String},
    itineraryId: {type: mongoose.Types.ObjectId, ref: "itinerary"},
})

const Comment = mongoose.model("comment", commentSchema)
module.exports = Comment