/**
 * Created by tornado.the.whirl on 3/20/17.
 */

/*
 * Contains the user related crud operations
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.server.schema.js");
    var q = require("q");

    // Entity manager creation. It is an object that gives us an api to talk with DB
    var User = mongoose.model("User",UserSchema);

    var api = {
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findFacebookUser:findFacebookUser
    };
    return api;

    // Finding User By Id
    function findUserById(userId){
        var deferred = q.defer();
        User.findById(userId, function (error, response) {
            if(error || response == null)
                deferred.reject(error);
            else
                deferred.resolve(response);
        });
        return deferred.promise;
    }

    // Find user by username
    function findUserByUsername(username) {
        var deferred = q.defer();
        User.find({username:username}, function (error, response) {
            if(error || response == null)
                deferred.reject(error);
            else
                deferred.resolve(response);
        });
        return deferred.promise;
    }

    // Find User by credentials
    function findUserByCredentials(username,password) {
        var deferred = q.defer();
        User.findOne({username:username, password: password}, function (error, response) {
            if(error || response == null)
                deferred.reject(error);
            else
                deferred.resolve(response);
        });
        return deferred.promise;
    }

    // Creating a User
    function createUser(user) {
        var deferred = q.defer();
        User.create(user, function (error, response) {
            if(error)
                deferred.reject(error);
            else
                deferred.resolve(response);
        });
        return deferred.promise;
    }

     //
    function updateUser(userId, newUser){
        //delete newUser._id;
        var deferred = q.defer();
        User.update(
            {_id: userId},
            { $set: newUser}, function (error, response) {
            if(error)
                deferred.reject(error);
            else
                deferred.resolve(response);
        });
        return deferred.promise;

    }

    function deleteUser(userId){
        var deferred = q.defer();
        User.remove(
            {_id: userId}, function (error, response) {
            if(error)
                deferred.reject(error);
            else
                deferred.resolve(response);
        });
        return deferred.promise;
    }

    function findFacebookUser(facebookId){
        return User.findOne({"facebook.id": facebookId})
    }
};
