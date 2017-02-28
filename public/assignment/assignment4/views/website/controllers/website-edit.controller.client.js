(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", editWebsiteController);

    function editWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        // Event handlers for handling the events
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;


        function init() {
            WebsiteService.findWebsitesByUser(vm.userId).success(function (websites) { vm.websites=websites; })
                .error(function (error) { console.log("Server error"); });

            WebsiteService.findWebsiteById(vm.websiteId).success(function (website) {
                    vm.website=angular.copy(website);
                })
        } init();



        function updateWebsite(website) {

            WebsiteService.updateWebsite(vm.websiteId,website).success(function () { $location.url("/user/" + vm.userId+"/website"); })
                .error(function () { console.log("Server Error"); });
        }

        function deleteWebsite(website) {

            WebsiteService.deleteWebsite(vm.websiteId).success(function (deleted) {
                init();
                $location.url("/user/" + vm.userId +"/website"); })
                .error(function () { console.log("Server Error"); });
        }
    }
})();