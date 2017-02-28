(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", newPageController);

    function newPageController($routeParams, $location, PageService) {
        var vm = this;
        var uid = $routeParams["uid"];
        vm.userId = uid;
        vm.websiteId = $routeParams["wid"];


        // Event handlers for handling the events
        vm.createPage = createPage;

        function init() {
        }
        init();

        function createPage (page) {
            PageService.createPage(vm.websiteId, page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
    }
})();
