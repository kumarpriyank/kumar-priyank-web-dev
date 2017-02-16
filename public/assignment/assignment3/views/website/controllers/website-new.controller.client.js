(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", newWebsiteController);

    function newWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        // Event handlers for handling the events
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function createWebsite (website) {
            WebsiteService.createWebsite(vm.userId, website);
            $location.url("/user/"+vm.userId+"/website");
        };
    }
})();
