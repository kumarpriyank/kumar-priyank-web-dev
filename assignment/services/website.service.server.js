/**
 * Created by Priyank Kumar on 2/27/17.
 */
module.exports = function(app) {

    /*
     *    Defining the list of websites
     */
    var websites = [
        {_id: "123", name: "Facebook", developerId: "456", description: "Lorem 1233" },
        {_id: "234", name: "Tweeter",  developerId: "456", description: "Lorem 234" },
        {_id: "456", name: "Gizmodo",  developerId: "456", description: "Lorem 456" },
        {_id: "1233", name: "Tic Tac Toe", developerId: "123", description: "Lorem 123" },
        {_id: "1234", name: "Checkers", developerId: "123", description: "Lorem 1234" },
        {_id: "1235", name: "Chess", developerId: "234", description: "Lorem 1235" },
        {_id: "124", name: "Checkers", developerId: "234", description: "Lorem Ipsum 124" },
        {_id: "125", name: "BlackJack", developerId: "234", description: "Lorem Ispum Lorem 125" }];

    /*
     *    Defining the request Handlers
     */
    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.post("/api/user/:userId/website", createWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);
    app.put("/api/website/:websiteId",updateWebsite);

    /*
     *    Find the websites for a particular user based on userId
     */
    function findWebsitesByUser(req,res) {
        var userId = req.params.userId;
        var result = [];
        for(var w in websites) {
            if(websites[w].developerId == userId) {
                result.push(websites[w]);
            }
        }
        res.json(result);
    }

    /*
     *    Create a new website and add it to the websites list.
     */
    function createWebsite (req,res) {
        var website = req.body;
        websites.push(website);
        res.send(website);
    }

    /*
     *    Find the websites by website Id
     */
    function findWebsiteById(req,res) {
        var wid=req.params.websiteId;
        for (var w in websites){
            if(websites[w]._id===wid){
                res.send(websites[w]);
            }
        }

    }

    /*
     *    Delete websites by WebSite Id
     */
    function deleteWebsite(req,res) {
        var wid=req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === wid) {
                websites.splice(w, 1);
            }
        }
        res.sendStatus(200);
    }

    /*
     *    Update Websites using WebsiteId
     */
    function updateWebsite(req,res) {
        var updatedWebsite = req.body;
        var wid = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === wid) {
                websites[w] = updatedWebsite;
            }
        }
        res.sendStatus(200);
    }

}