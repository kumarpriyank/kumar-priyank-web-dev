(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            {_id: "324", name: "Post 11", websiteId: "123", description: "Lorem Ipsum" },
            {_id: "322", name: "Post 12", websiteId: "123", description: "Lorem Ipsum" },
            {_id: "323", name: "Post 13", websiteId: "123", description: "Lorem Ipsum" },
            {_id: "321", name: "Post 1", websiteId: "456", description: "Lorem Ipsum" },
            {_id: "432", name: "Post 2",  websiteId: "456", description: "Lorem Ipsum" },
            {_id: "543", name: "Post 3",  websiteId: "456", description: "Lorem Ipsum" }
        ];

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
            page.websiteId=websiteId;
            page._id = (new Date()).getTime();
            pages.push(page);
        }


        // Find Page by WebsiteId
        function findPageByWebsiteId(websiteId) {
            var result = [];
            for (var p in pages) {
                if( pages[p].websiteId == websiteId)
                    result.push(pages[p]);
            }
            return result;
        }


        // Find Page by Page Id
        function findPageById(pageId) {
            for (var p in pages) {
                if( pages[p]._id == pageId)
                    return angular.copy(pages[p]);
            }
            return null;
        }


        // Update Pages
        function updatePage(pageId, page) {
            for(var p in pages) {
                if( pages[p]._id == pageId ) {
                    pages[p].name = page.name;
                    pages[p].websiteId = page.websiteId;
                    pages[p].description = page.description;
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        // Delete the Page
        function deletePage(pageId) {
            for(var p in pages) {
                if (pages[p]._id == pageId) {
                    pages.splice(pages.indexOf(p), 1);
                }
            }
        }
    }
})();

