(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", widgetListController);

    function widgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;


        function init() {
            WidgetService.findWidgetsByPageId(vm.pageId).then(function(result){
                vm.widgets = result.data;
                $("#widgetList").sortable({ axis:"y" });  });
        } init();


        function getTrustedHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getYouTubeEmbedUrl(widget) {
            var urlParts = widget.url.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();