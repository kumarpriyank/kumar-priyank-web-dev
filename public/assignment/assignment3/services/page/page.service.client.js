(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            {_id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
            {_id: "432", name: "Post 2",  websiteId: "456", description: "Lorem" },
            {_id: "543", name: "Post 3",  websiteId: "456", description: "Lorem" }
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
            pages.push(page);
            pages.push(newPage);
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
                    return pages[p];
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
                }
            }
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

