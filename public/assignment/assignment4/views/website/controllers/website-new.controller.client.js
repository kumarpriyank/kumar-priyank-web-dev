(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteController", websiteController);

    function websiteController($routeParams, $location, WebsiteService) {

        var vm = this;
        vm.userId = $routeParams["uid"];


        // Event handlers for handling the events
        vm.createWebsite = createWebsite;



        function init() {

            WebsiteService.findWebsitesByUser(vm.userId).success(function (websites) { vm.websites=websites; })
                .error(function (error) { console.log("Server Error"); });
        } init();



        function createWebsite(website) {

            if(website.name===undefined || website.name===""){
                vm.error="Please enter a valid website name";
                return;
            }

            vm.error = undefined;

            WebsiteService.createWebsite(vm.userId,website).success( function (newwebsite) { $location.url("/user/" + vm.userId +"/website"); })
                .error(function (error) { console.log("Server Error"); });
        }
    }
})();