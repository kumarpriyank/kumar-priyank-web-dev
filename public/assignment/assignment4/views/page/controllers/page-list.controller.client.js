(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", pageListController);

    function pageListController($routeParams, $location, PageService) {

        var vm = this;
        var uid = $routeParams["uid"];
        vm.userId = uid;
        vm.websiteId = $routeParams["wid"];

        function init() {
            PageService.findPageByWebsiteId(vm.websiteId).success(function (pages) { vm.pages = pages; })
                .error(function (error) { vm.error="No pages to Display"; });
        } init();
    }
})();