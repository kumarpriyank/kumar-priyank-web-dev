/**
 * Created by tornado.the.whirl on 3/21/17.
 */

/*
 * Contains the page related crud operations
 */
module.exports = function () {

    var mongoose = require("mongoose");

    var PageSchema = require("./page.schema.server");
    var WebsiteSchema = require("../website/website.schema.server.js");
    var q = require("q");

    // Entity manager creation. It is an object that gives us an api to talk with DB
    var Page = mongoose.model("Page",PageSchema);
    var Website = mongoose.model("Website",WebsiteSchema);


    var api = {
        findAllPagesForWebsite: findAllPagesForWebsite,
        createPage: createPage,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    }
    return api;


    // Find All Pages for a given Website
    function findAllPagesForWebsite(websiteId){
        var deferred = q.defer();
        Page.find({_website:websiteId} , function (error, response) {
            if(error || response == null)
                deferred.reject(error);
            else
                deferred.resolve(response);
        });
        return deferred.promise;
    }

    // Create New Page
    function createPage(websiteId, newPage){
        var deferred = q.defer();
        newPage._website = websiteId;
        Page.create(newPage, function (error, response) {
            if(error)
                deferred.reject(error);
            else
                deferred.resolve(response);
        });
        return deferred.promise;
    }

    // Find Page by Page Id
    function findPageById(pageId){
        var deferred = q.defer();
        Page.findById(pageId, function (error, response) {
            if(error || response == null)
                deferred.reject(error);
            else
                deferred.resolve(response);
        });
        return deferred.promise;
    }

    // Update the Page
    function updatePage(pageId, newPage){
        var deferred = q.defer();
        Page.update(
            {_id: pageId},
            { $set: newPage}, function (error, response) {
                if(error)
                    deferred.reject(error);
                else
                    deferred.resolve(response);
            });
        return deferred.promise;
    }

    // Delete a Page using Page ID
    function deletePage(pageId){
        var deferred = q.defer();
        Page.remove(
            {_id: pageId}, function (error, response) {
                if(error)
                    deferred.reject(error);
                else
                    deferred.resolve(response);
            });
        return deferred.promise;
    }
};