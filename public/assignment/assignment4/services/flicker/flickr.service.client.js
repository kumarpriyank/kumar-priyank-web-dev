/**
 * Created by tornado.the.whirl on 3/20/17.
 */
(function(){
    angular.module("WebAppMaker")
        .factory("FlickrService",FlickrService);

    var key = "1ea4f12b6662a826c79cc22335aa4042";
    var secret = "f538cf943344f49c";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http){
        var api = { searchPhotos : searchPhotos };
        return api;

        function searchPhotos(searchText){
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchText);
            return $http.get(url);
        }
    }
})();