(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            {_id: "123", widgetType: "HEADER", pageId: "321", size:"2", text: "GIZMODO" },
            {_id: "234", widgetType: "HEADER", pageId: "321", size:"4", text: "Loren Ipsum 321" },
            {_id: "345", widgetType: "IMAGE", text:"Image1",pageId: "321", width:"100%", url: "http://lorempixel.com/400/200/" },
            {_id: "456", widgetType: "HTML", pageId: "321", text: "<p> Lorem Ipsum 321</p>" },
            {_id: "567", widgetType: "HEADER", pageId: "321", size:"4", text: "Lorem Ipsum" },
            {_id: "678", widgetType: "YOUTUBE", pageId: "321", width:"100%", url: "http://youtube.com/AM2Ivdi9c4E" },
            {_id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem Ip</p>" },
            {_id: "239", widgetType: "HEADER", pageId: "324", size:"4", text: "Loren Ipsum" },
            {_id: "349", widgetType: "IMAGE", text:"Image1", pageId: "324", width:"100%", url: "http://lorempixel.com/400/200/" },
            {_id: "459", widgetType: "HTML", pageId: "324", text: "<p> Lorem</p>" },
            {_id: "679", widgetType: "YOUTUBE", pageId: "324", width:"100%", url: "http://youtube.com/AM2Ivdi9c4E" }
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
            widget._id = (new Date()).getTime();
            widgets.push(widget);
        }

        // Find Widget by Page
        function findWidgetsByPageId(pageId) {
            var wig = [];
            for (var wi in widgets) {
                if( widgets[wi].pageId == pageId)
                    wig.push(widgets[wi]);
            }
            return wig;
        }

        // Find Widget by Widget id
        function findWidgetById(widgetId) {
            for (var wi in widgets) {
                if( widgets[wi]._id == widgetId)
                    return angular.copy(widgets[wi]);
            }
            return null;
        }


        // Update Widget
        function updateWidget(widgetId, widget) {
            for(var wi in widgets) {
                if( widgets[wi]._id == widgetId ) {
                    if(widgets[wi].widgetType === "HEADER"){

                        widgets[wi].text = widget.text;
                        widgets[wi].size = widget.size;

                    }
                    else if (widgets[wi].widgetType === "HTML") {

                        widgets[wi].text = widget.text;

                    } else if (widgets[wi].widgetType === "IMAGE" || widgets[wi].widgetType === "YOUTUBE"){

                        widgets[wi].name = widget.name;
                        widgets[wi].text = widget.text;
                        widgets[wi].url = widget.url;
                        widgets[wi].width = widget.width;


                    }
                    return angular.copy(widgets[wi]);
                }
            }
            return null;
        }

        // Delete the Widget
        function deleteWidget(widgetId) {
            var x=0;
            for(var wi in widgets) {
                if (widgets[wi]._id == widgetId) {
                    widgets.splice(x, 1);
                }
                x++;
            }
        }
    }
})();
