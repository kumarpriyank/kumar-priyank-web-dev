/**
 * Created by tornado.the.whirl on 3/21/17.
 */

/*
 * Contains the website related crud operations
 */
module.exports = function () {

    var mongoose = require("mongoose");

    var WebsiteSchema = require("./website.schema.server.js");
    var UserSchema = require("../user/user.server.schema.js");
    var q = require("q");

    // Entity manager creation. It is an object that gives us an api to talk with DB
    var Website = mongoose.model("Website",WebsiteSchema);
    var User = mongoose.model('User', UserSchema);

    var api = {
        findWebsitesByUser: findWebsitesByUser,
        createWebsite: createWebsite,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    }
    return api;


    // Find Website by UserId
    function findWebsitesByUser(userId){
        var deferred = q.defer();
        Website.find({_user: userId} , function (error, response) {
            if(error || response == null)
                deferred.reject(error);
            else
                deferred.resolve(response);
        });
        return deferred.promise;
    }


    // Create New Website
    function createWebsite(userId, newWebsite){
        var deferred = q.defer();
        newWebsite._user = userId;
        Website.create(newWebsite, function (error, response) {
            if(error)
                deferred.reject(error);
            else
                deferred.resolve(response);
        });
        return deferred.promise;
    }


    // Find website by Website Id
    function findWebsiteById(websiteId){
        var deferred = q.defer();
        Website.findById(websiteId, function (error, response) {
            if(error || response == null)
                deferred.reject(error);
            else
                deferred.resolve(response);
        });
        return deferred.promise;
    }

    // Update the website
    function updateWebsite(websiteId, website){
        var deferred = q.defer();
        Website.update(
            {_id: websiteId},
            { $set: website}, function (error, response) {
            if(error)
                deferred.reject(error);
            else
                deferred.resolve(response);
        });
        return deferred.promise;
    }

    // Delete a website
    function deleteWebsite(websiteId){
        var deferred = q.defer();
        Website.remove(
            {_id: websiteId}, function (error, response) {
            if(error)
                deferred.reject(error);
            else
                deferred.resolve(response);
        });
        return deferred.promise;
    }
};