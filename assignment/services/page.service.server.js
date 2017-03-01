/**
 * Created by Priyank Kumar on 2/27/17.
 */
module.exports = function(app) {


    var pages = [
        {_id: "324", name: "Post 11", websiteId: "123", description: "Lorem Ipsum 324" },
        {_id: "322", name: "Post 12", websiteId: "123", description: "Lorem Ipsum 322" },
        {_id: "323", name: "Post 13", websiteId: "123", description: "Lorem Ipsum 323" },
        {_id: "321", name: "Post 1", websiteId: "456", description: "Lorem Ipsum 321" },
        {_id: "432", name: "Post 2",  websiteId: "456", description: "Lorem Ipsum 432" },
        {_id: "543", name: "Post 3",  websiteId: "456", description: "Lorem Ipsum 543" }];

    /*
     *    Defining the request Handlers
     */
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.post("/api/website/:websiteId/page",createPage);
    app.delete("/api/page/:pageId",deletePage);
    app.put("/api/page/:pageId",updatePage);


    /*
     *    Find all Pages for a Website
     */
    function findAllPagesForWebsite(req,res) {
        var websiteId = req.params.websiteId;
        var result = [];
        for(var p in pages) {
            if(pages[p].websiteId === websiteId) {
                result.push(pages[p]);
            }
        }
        res.json(result);
    }

    /*
     *    Create a new Page
     */
    function createPage(req,res) {
        var newPage = req.body;
        pages.push(newPage);
        res.send(pages);
    }

    /*
     *    Find Page by PageID
     */
    function findPageById(req,res) {
        var pageId=req.params.pageId;
        for (var p in pages){
            if(pages[p]._id == pageId){
                res.send(pages[p]);
            }
        }
    }

    /*
     *    Delete Page  by PageID
     */
    function deletePage(req,res) {
        var pageId=req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id == pageId) {
                pages.splice(p, 1);
            }
        }
        res.sendStatus(200);
    }

    /*
     *    Update Page  by PageID
     */
    function updatePage(req,res) {
        var updatedPage = req.body;
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id == pageId) {
                pages[p] = updatedPage;
            }
        }
        res.sendStatus(200);
    }


}
