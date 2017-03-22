(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "createWidget":createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget":updateWidget,
            "deleteWidget":deleteWidget,
            "reorderWidget" : reorderWidget
        };
        return api;

        // Creating a Widget
        function createWidget(pageId, widget) {
            if(widget.width){
            }
            else
                widget.width="100%";
            return $http.post("/api/page/" + pageId + "/widget",widget);
        }

        // Find Widget by Page
        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/" + pageId + "/widget");
        }


        // Find Widget by Widget Id
        function findWidgetById(widgetId) {
            return $http.get("/api/widget/" + widgetId);
        }


        // Update Widget
        function updateWidget(widgetId, widget) {
            if(widget.width){
            }
            else widget.width="100%"
            return $http.put("/api/widget/" + widgetId, widget);
        }

        // Delete the Widget
        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/" + widgetId);
        }

        // Reorder Widget
        function reorderWidget(pageId, index1, index2) {
            return $http.put("/page/"+pageId+"/widget?start="+index1+"&end="+index2);

        }
    }
})();