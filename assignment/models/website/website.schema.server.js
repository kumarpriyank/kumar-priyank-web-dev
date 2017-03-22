/**
 * Created by tornado.the.whirl on 3/21/17.
 */

/*
 *  Describes how the schema of the Website looks like
 */

// Adding required dependency
var mongoose = require("mongoose");

var WebsiteSchema = mongoose.Schema({
    _user:
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },

    name: String,
    description: String,

    pages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Page'
        }],

    dateCreated:
        {
            type: Date,
            default: Date.now
        },
    // Explicitly telling which collection to store it in.
}, {collection: "assignment.website"});

module.exports = WebsiteSchema;