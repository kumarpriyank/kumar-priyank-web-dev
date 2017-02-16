(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            {_id: "123", widgetType: "HEADER", pageId: "321", size:"2", text: "GIZMODO" },
            {_id: "234", widgetType: "HEADER", pageId: "321", size:"4", text: "Loren Ipsum" },
            {_id: "345", widgetType: "IMAGE", pageId: "321", width:"100%", url: "http://lorempixel.com/400/200/" },
            {_id: "456", widgetType: "HTML", pageId: "321", text: "<p> Lorem Ipsum</p>" },
            {_id: "567", widgetType: "HEADER", pageId: "321", size:"4", text: "Lorem Ipsum" },
            {_id: "678", widgetType: "YOUTUBE", pageId: "321", width:"100%", url: "http://youtube.com/AM2Ivdi9c4E" },
            {_id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem Ipsum</p>" }
        ];

        var api = {
            "createWidget":createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget":updateWidget,
            "deleteWidget":deleteWidget
        };
        return api;

        // Creating a Widget
        function createWidget(pageId, widget) {
            widget.pageId=pageId;
            widget.push(widget);
        }

        // Find Widget by Page
        function findWidgetsByPageId(pageId) {
            for (var wi in widgets) {
                if( widgets[wi].pageId == pageId)
                    return widgets[wi];
            }
            return null;
        }

        // Find Widget by Widget id
        function findWidgetById(widgetId) {
            for (var wi in widgets) {
                if( widgets[wi]._id == widgetId)
                    return widget[wi];
            }
            return null;
        }


        // Update Widget
        function updateWidget(widgetId, widget) {
            for(var wi in widgets) {
                if( widgets[wi]._id == widgetId ) {
                    widgets[wi] = widget;
                }
            }
        }

        // Delete the Widget
        function deleteWidget(widgetId) {
            for(var wi in widgets) {
                if (widgets[wi]._id == widgetId) {
                    widgets.splice(widgets.indexOf(wi), 1);
                }
            }
        }
    }
})();
