/**
 * Created by Priyank Kumar on 2/27/17.
 */
module.exports = function(app, models) {

    var pageModel = models.pageModel;
    var websiteModel = models.websiteModel;

    /*
    var pages = [
        {_id: "324", name: "Post 11", websiteId: "123", description: "Lorem Ipsum 324" },
        {_id: "322", name: "Post 12", websiteId: "123", description: "Lorem Ipsum 322" },
        {_id: "323", name: "Post 13", websiteId: "123", description: "Lorem Ipsum 323" },
        {_id: "321", name: "Post 1", websiteId: "456", description: "Lorem Ipsum 321" },
        {_id: "432", name: "Post 2",  websiteId: "456", description: "Lorem Ipsum 432" },
        {_id: "543", name: "Post 3",  websiteId: "456", description: "Lorem Ipsum 543" }];
        */

   /*
    *    Defining the request Handlers
    */
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.post("/api/website/:websiteId/page",createPage);
    app.delete("/api/page/:pageId",deletePage);
    app.put("/api/page/:pageId",updatePage);


    /*
     *    Find all Pages for a Website Id
     */
    function findAllPagesForWebsite(req,res) {
        var websiteId = req.params.websiteId;
        pageModel.findAllPagesForWebsite(websiteId).then(
            function (page) { res.json(page); },
            function (error) { res.statusCode(404).send(error); });
    }

    /*
     *    Find Page by PageID
     */
    function findPageById(req,res) {
        var pageId=req.params.pageId;
        pageModel.findPageById(pageId).then(
            function (page) { res.json(page); },
            function (error) { res.statusCode(404).send(error);} );
    }

    /*
     *    Create a new Page
     */
    function createPage(req,res) {

        var page = req.body;
        var websiteId = req.params.websiteId;
        // Create New Page - 1) Create a new page and insert into the page table
        // 2) Update the pages array of websites with the latest created page Id.

        // Getting hold of the website by the website Id provided
        var websiteObjectPromise = websiteModel.findWebsiteById(websiteId);

        // Adding the Page
        var newPagePromise = pageModel.createPage(websiteId, page);



        // Now we will use Promise all to work only when we get both the calls return success.
        // Promise.all() returns a single Promise that resolves when all of the promises in the iterable argument have resolved,
        // or rejects with the reason of the first promise that rejects.

        Promise.all([websiteObjectPromise, newPagePromise]).then(
            function (success) {
                // Adding pages to website table pages array
                success[0].pages.push(success[1]._id);

                // Updating the website table also with the updated pages
                websiteModel.updateWebsite(websiteId, success[0]).then(
                    function (website) { res.json(success[1]); },
                    function (error) { res.statusCode(500).send(error);}); },

            function (error) {
                res.statusCode(500).send(error);
            });
    }


    /*
     *    Delete Page  by PageID
     */
    function deletePage(req,res) {
        var pageId=req.params.pageId;
        pageModel.deletePage(pageId).then(
            function (success) { res.send(200); },
            function (error) { res.statusCode(404).send(error); });
    }

    /*
     *    Update Page  by PageID
     */
    function updatePage(req,res) {
        var updatedPage = req.body;
        var pageId = req.params.pageId;
        pageModel.updatePage(pageId, updatedPage).then(
            function (success) { res.send(200);},
            function (error) { res.statusCode(404).send(error);});
    }
}
