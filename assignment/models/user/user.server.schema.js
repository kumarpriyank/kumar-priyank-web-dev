/**
 * Created by tornado.the.whirl on 3/20/17.
 */

/*
 *  Describes how the schema of the users looks like
 */

// Adding required dependency
var mongoose = require("mongoose");

// Creating a User Schema Object
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    websites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Website'
    }]
    // Explicitly telling which collection to store it in.
}, {collection: "assignment.user"});

module.exports = UserSchema;