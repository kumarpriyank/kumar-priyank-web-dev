(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", newWidgetController);

    function newWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.addWidget = addWidget;

        // Initialize Functions
        function init() {
        } init();



        function addWidget(type) {
            var widget = {};
            widget.widgetType = type;
            WidgetService.createWidget(vm.pageId,widget).then(
                    function(result){
                        vm.widget = result.data;
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id); },
                    function(error){
                        vm.error = "Unable to create a new widget";} );
        }
    }
})();
