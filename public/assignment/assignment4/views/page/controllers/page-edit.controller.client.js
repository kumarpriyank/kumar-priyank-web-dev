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
            PageService.findPageById(vm.pageId).success(function (result) { vm.page=angular.copy(result); })
                        .error(function (error) { vm.error="No pages to Display"; });
        } init();

        function updatePage(page) {
            PageService.updatePage(vm.pageId,page).success(function (updatedPge) { $location.url("/user/"+  vm.userId +"/website/"+vm.websiteId +"/page"); })
                        .error(function (error) { vm.error="Error Updating Page. Please try again."; });
        }

        function deletePage(page) {
            PageService.deletePage(vm.pageId).success(function (deletedPages) { $location.url("/user/"+  vm.userId +"/website/"+vm.websiteId +"/page"); })
                       .error(function (error) { vm.error="Error Deleting Page. Please try again."; });
        }
    }
})();