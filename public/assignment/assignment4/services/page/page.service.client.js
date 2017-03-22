(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            "createPage":createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage
        };
        return api;

        // Creating a Page
        function createPage(websiteId, page) {
            //page._id = (new Date()).getTime()+"";
            page.websiteId=websiteId;
            return $http.post("/api/website/"+websiteId +"/page", page);
        }


        // Find Page by WebsiteId
        function findPageByWebsiteId(websiteId) {
            return $http.get("/api/website/"+websiteId +"/page");
        }


        // Find Page by Page Id
        function findPageById(pageId) {
            return $http.get("/api/page/" + pageId);
        }


        // Update Pages
        function updatePage(pageId, page) {
            return $http.put("/api/page/" + pageId, page);
        }

        // Delete the Page
        function deletePage(pageId) {
            return $http.delete("/api/page/" + pageId);
        }
    }
})();

