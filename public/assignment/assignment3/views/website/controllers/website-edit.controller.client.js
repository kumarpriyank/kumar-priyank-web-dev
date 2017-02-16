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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function updateWebsite(website) {
            website.developerId = vm.userId;
            var website = WebsiteService.updateWebsite(vm.websiteId, website);
            if (website == null) {
                vm.error = "Unable to update website. Please try again";
            } else {
                $location.url("/user/" + vm.userId + "/website");
            }
        };

        function deleteWebsite(website) {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website");
        };
    }
})();
