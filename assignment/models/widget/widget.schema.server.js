/**
 * Created by tornado.the.whirl on 3/22/17.
 */

/*
 * Contains the widgets related schema
 */

// Adding required dependency
var mongoose = require("mongoose");

var WidgetSchema = mongoose.Schema({
    _page:
        {
            type: mongoose.Schema.ObjectId,
            ref: "Page"
        },

    widgetType:
        {
            type: String,
            enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']
        },

    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    order: Number,

    dateCreated:
        {
            type: Date,
            default: Date.now
        },
    // Explicitly telling which collection to store it in.
}, {collection: "assignment.widget"});


module.exports = WidgetSchema;