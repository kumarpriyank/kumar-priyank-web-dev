(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", newWebsiteController);

    function newWebsiteController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.deleteWidget = deleteWidget;
        vm.addWidget = addWidget;

        // Get all the widgets
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();


        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/" + vm.userId + "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function addWidget(type) {
            vm.widget = angular.copy(vm.widgets[0]);
            vm.widget._id = -1;
            vm.widget.widgetType = type;
            WidgetService.createWidget(vm.pageId,vm.widget);

            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId +
                "/page/" + vm.pageId + "/widget/" + vm.widget._id);
        }

    }
})();
