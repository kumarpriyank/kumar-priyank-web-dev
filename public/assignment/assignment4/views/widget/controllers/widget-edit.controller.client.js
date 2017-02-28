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

        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;

        // Get all the widgets
        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/editor/widget-'+type+'-editor.view.client.html';
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/" + vm.userId + "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function updateWidget(widget) {
            widget.pageId = vm.pageId;
            WidgetService.updateWidget(vm.widgetId, widget);
            $location.url("/user/" + vm.userId + "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");

        }
    }
})();
