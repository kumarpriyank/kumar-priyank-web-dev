(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController);

    function websiteListController($routeParams, $location, WebsiteService) {
        var vm = this;
        var uid = $routeParams["uid"];
        vm.userId = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);

        // Event handlers for handling the events

        function init() {
        }
        init();
    }
})();
