(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", pageListController);

    function pageListController($routeParams, $location, PageService) {
        var vm = this;
        var uid = $routeParams["uid"];
        vm.userId = uid;
        vm.websiteId = $routeParams["wid"];

        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);

        // Event handlers for handling the events

        function init() {
            if(vm.pages.length == 0) {
                vm.error = "No pages to Display";
            }
        }
        init();
    }
})();
