(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController);

    function websiteListController($routeParams, $location, WebsiteService) {

        var vm = this;
        var uid = $routeParams["uid"];
        vm.userId = $routeParams.uid;


        function init() {
            WebsiteService.findWebsitesByUser(vm.userId).success( function (websites) { vm.websites = websites; })
                .error( function() { vm.error = "No Websites Found" });
        } init();
    }
})();
