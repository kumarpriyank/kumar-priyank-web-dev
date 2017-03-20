/**
 * Created by tornado.the.whirl on 3/20/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController",flickrImageSearchController);

    function flickrImageSearchController($routeParams,  $location, WidgetService, FlickrService){

        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        // Photos related
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchText){
            FlickrService.searchPhotos(searchText)
                .then(function(response){
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url = url + "/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(
                    function(success)
                    {
                        var updatedWidget = success.data;
                        updatedWidget.url = url;
                        updatedWidget.width = "100%";
                        WidgetService
                            .updateWidget(vm.widgetId,updatedWidget)
                            .then(
                                function(success){
                                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
                                },
                                function(error){ vm.error = "Photo not selected"; });
                    },
                    function(error) { vm.error = "Widget not found"; });
        }
    }
})();