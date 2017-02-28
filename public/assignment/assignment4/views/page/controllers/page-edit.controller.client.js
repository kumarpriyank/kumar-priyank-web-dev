(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", editPageController);

    function editPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        // Event handlers for handling the events
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;


        function init() {
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage(page) {
            var pg = PageService.updatePage(vm.pageId, page);
            if (pg == null) {
                vm.error = "Unable to update Page. Please try again";
            } else {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        }

        function deletePage(page) {
            PageService.deletePage(vm.pageId);
            $location.url("/user/" + vm.userId + "/website/"+vm.websiteId+"/page");
        }
    }
})();
