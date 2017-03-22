/**
 * Created by tornado.the.whirl on 3/21/17.
 */

/*
 * Contains the page related schema
 */

// Adding required dependency
var mongoose = require("mongoose");


var PageSchema = mongoose.Schema({
    _website: {
        type: mongoose.Schema.ObjectId,
        ref: "Website"
    },

    name: String,
    title: String,
    description: String,

    widgets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Widget'
        }],

    dateCreated:
        {
            type: Date,
            default: Date.now
        },
    // Explicitly telling which collection to store it in.
}, {collection: "assignment.page"});

module.exports = PageSchema;