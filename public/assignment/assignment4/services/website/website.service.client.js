(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api = {
            "createWebsite":createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite":updateWebsite,
            "deleteWebsite":deleteWebsite
        };
        return api;

        // Creating a Website
        function createWebsite(userId, website) {
           // website._id = new Date().getTime()+"";
            website.developerId = userId;
            return $http.post("/api/user/"+userId+"/website", website);
        }

        // Find website by user
        function findWebsitesByUser(userId) {
            return $http.get("/api/user/"+ userId +"/website");
        }


        // Find Website by website id
        function findWebsiteById(websiteId) {
            return $http.get("/api/website/" + websiteId);
        }


        // Update Website
        function updateWebsite(websiteId, website) {
            return $http.put("/api/website/" + websiteId, website);
        }


        // Delete the website
        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/" + websiteId);
        }
    }
})();
