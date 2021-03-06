(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            {_id: "123", name: "Facebook", developerId: "456", description: "Lorem" },
            {_id: "234", name: "Tweeter",  developerId: "456", description: "Lorem" },
            {_id: "456", name: "Gizmodo",  developerId: "456", description: "Lorem" },
            {_id: "1233", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
            {_id: "1234", name: "Checkers", developerId: "123", description: "Lorem" },
            {_id: "1235", name: "Chess", developerId: "234", description: "Lorem" },
            {_id: "124", name: "Checkers", developerId: "234", description: "Lorem Ipsum" },
            {_id: "125", name: "BlackJack", developerId: "234", description: "Lorem Ispum Lorem" }
        ];

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
            website.developerId = userId;
            website._id = (new Date()).getTime();
            websites.push(website);
        }

        // Find website by user
        function findWebsitesByUser(userId) {
            var sites = [];
            for (var w in websites) {
                if( websites[w].developerId == userId)
                    sites.push(websites[w]);
            }
            return sites;
        }


        // Find Website by website id
        function findWebsiteById(websiteId) {
            for (var w in websites) {
                if( websites[w]._id == websiteId)
                    return angular.copy(websites[w]);
            }
            return null;
        }



        // Update Website
        function updateWebsite(websiteId, website) {
            for(var w in websites) {
                if( websites[w]._id == websiteId ) {
                    websites[w].name = website.name;
                    websites[w].developerId = website.developerId;
                    websites[w].description = website.description;
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        // Delete the website
        function deleteWebsite(websiteId) {
            var x=0;
            for(var w in websites) {

                if (websites[w]._id == websiteId) {
                    websites.splice(x, 1);
                }
                x++;
            }
        }
    }
})();
