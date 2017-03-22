/**
 * Created by tornado.the.whirl on 3/22/17.
 */

/*
 *  Contains the Widget related crud operations
 */
module.exports = function () {

    var mongoose = require("mongoose");

    var WidgetSchema = require("./widget.schema.server.js");
    var PageSchema = require("../page/page.schema.server.js");
    var q = require("q");

    // Entity manager creation. It is an object that gives us an api to talk with DB
    var Widget = mongoose.model("Widget",WidgetSchema);
    var Page = mongoose.model("Page",PageSchema);


    var api = {
        findWidgetsByPageId: findWidgetsByPageId,
        createWidget: createWidget,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    }
    return api;


    // Find All Widgets for a given Page
    function findWidgetsByPageId(pageId){
        var deferred = q.defer();
        Widget.find({_page:pageId} , function (error, response) {
            if(error || response == null)
                deferred.reject(error);
            else
                deferred.resolve(response);
        });
        return deferred.promise;
    }

    // Create New Widget
    function createWidget(pageId, newWidget){

        var deferred = q.defer();
        newWidget._page = pageId;

        // Get the widget order before inserting
        return Widget.find({_page: pageId}).then(
            function (widgets) {
                newWidget.order = widgets.length;
                Widget.create(newWidget, function (error, response) {
                    if(error)
                        deferred.reject(error);
                    else
                        deferred.resolve(response);
                });
                return deferred.promise;
            });









    }


    // Find Widget by Widget Id
    function findWidgetById(widgetId){
        var deferred = q.defer();
        Widget.findById(widgetId, function (error, response) {
            if(error || response == null)
                deferred.reject(error);
            else
                deferred.resolve(response);
        });
        return deferred.promise;
    }


    // Update the Widget used Widget Id
    function updateWidget(widgetId, newWidget){
        var deferred = q.defer();
        Widget.update(
            {_id: widgetId},
            { $set: newWidget}, function (error, response) {
                if(error)
                    deferred.reject(error);
                else
                    deferred.resolve(response);
            });
        return deferred.promise;
    }

    // Delete a Widget using Widget ID
    function deleteWidget(widgetId){
        var deferred = q.defer();
        Widget.remove(
            {_id: widgetId}, function (error, response) {
                if(error)
                    deferred.reject(error);
                else
                    deferred.resolve(response);
            });
        return deferred.promise;
    }

    // Reorder the widgets
    function reorderWidget(pageId, start, end){
        return Widget.find(
            {
                _page: pageId},
            function(error,widgets){
                widgets.forEach(function(widget){
                    if(start > end) {
                        if(widget.order >= end && widget.order < start){
                            widget.order++;
                            widget.save(function(){});
                        }
                        else if(widget.order == start) {
                            widget.order = end;
                            widget.save(function(){});
                        }
                    }
                    else {
                        if(widget.order > start && widget.order <= end) {
                            widget.order--;
                            widget.save(function(){});
                        }
                        else if(widget.order == start) {
                            widget.order = end;
                            widget.save(function(){});
                        }
                    }
                });
            });
    }
};