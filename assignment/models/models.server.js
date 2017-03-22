/**
 * Created by tornado.the.whirl on 3/20/17.
 */

/*
 * Contains the setting for the databases.
 * Entry point into the database connection. Helps to interact with the database
 */
module.exports = function () {

    // Import the Mongoose Libraey
    var mongoose = require("mongoose");

    // Set the Connection String
    // If the database cs5610spring does not exist then it creates it.
    var connectionString = 'mongodb://127.0.0.1:27017/cs5610spring';


/*
    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }*/


    //Get the default connection
    mongoose.connect(connectionString);

    var models = {
        userModel: require("./user/user.model.server.js")(),
        websiteModel: require("./website/website.model.server.js")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widget/widget.model.server")()
    };
    return models;
};