(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", editWidgetController);

    function editWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;

        // Get the widget with the widget id
        function init() {
            WidgetService.findWidgetById(vm.widgetId)
                .then(function(response){
                    vm.widget = response.data;
                });
        } init();



        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId).then( function(result){ $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget"); },
                    function(error){ vm.error = "Not able to delete the widget"; });
        }

        function updateWidget(widget) {
            widget.pageId = vm.pageId;
            WidgetService.updateWidget(vm.widgetId,widget).success(function (result) { $location.url("/user/"+ vm.userId+ "/website/"+ vm.websiteId+"/page/" + vm.pageId+"/widget"); })
                .error(function (error) { vm.error= "Error Updating widget"; });
        }
    }
})();