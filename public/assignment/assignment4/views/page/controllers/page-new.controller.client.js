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
            PageService.createPage(vm.websiteId,page).success(function (newPage) { $location.url("user/"+ vm.userId+ "/website/"+vm.websiteId +"/page"); })
                .error(function (error) { vm.error = "Error occured while creating page."; });
        }
    }
})();