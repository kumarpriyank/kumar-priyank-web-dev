/**
 * Created by Priyank Kumar on 2/27/17.
 */
module.exports = function(app, models) {

    var websiteModel = models.websiteModel;
    var userModel = models.userModel;

    /*
     *    Defining the list of websites

    var websites = [
        {_id: "123", name: "Facebook", developerId: "456", description: "Lorem 1233" },
        {_id: "234", name: "Tweeter",  developerId: "456", description: "Lorem 234" },
        {_id: "456", name: "Gizmodo",  developerId: "456", description: "Lorem 456" },
        {_id: "1233", name: "Tic Tac Toe", developerId: "123", description: "Lorem 123" },
        {_id: "1234", name: "Checkers", developerId: "123", description: "Lorem 1234" },
        {_id: "1235", name: "Chess", developerId: "234", description: "Lorem 1235" },
        {_id: "124", name: "Checkers", developerId: "234", description: "Lorem Ipsum 124" },
        {_id: "125", name: "BlackJack", developerId: "234", description: "Lorem Ispum Lorem 125" }];
     */



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
            websiteModel.findWebsitesByUser(userId).then(
                function (website) { res.json(website); },
                function (error) { res.statusCode(404).send(error); });
    }


    /*
     *    Find the Websites by Website Id
     */
    function findWebsiteById(req,res) {
        var wid=req.params.websiteId;
            websiteModel.findWebsiteById(wid).then(
                function (website) { res.json(website); },
                function (error) { res.statusCode(404).send(error);} );
    }

    /*
     *    Create a new website and add it to the websites list.
     */
    function createWebsite (req,res) {
        var website = req.body;
        var userId = req.params.userId;

        // Create New Website - 1) Create a new website and insert into the websites table
        // 2) Update the websites array of users with the latest created website Id.

        // Getting hold of the user by the userId provided
        var userObjectPromise = userModel.findUserById(userId);

        // Adding the website
        var newWebSitePromise = websiteModel.createWebsite(userId, website);


        // Now we will use Promise all to work only when we get both the calls return success.
        // Promise.all() returns a single Promise that resolves when all of the promises in the iterable argument have resolved,
        // or rejects with the reason of the first promise that rejects.

        Promise.all([userObjectPromise, newWebSitePromise]).then(
                function (success) {
                    // Adding websites to user table websites array
                    success[0].websites.push(success[1]._id);

                    // Updating the user table also with the updated user
                    userModel.updateUser(userId, success[0]).then(
                        function (user) { res.json(success[1]); },
                        function (error) { res.statusCode(500).send(error);}); },

                function (error) {
                    res.statusCode(500).send(error);
                });
    }

    /*
     *    Delete websites by WebSite Id
     */
    function deleteWebsite(req,res) {
        var wid=req.params.websiteId;
        websiteModel.deleteWebsite(wid).then(
            function (success) { res.send(200); },
            function (error) { res.statusCode(404).send(error); });
    }


    /*
     *    Update Websites using WebsiteId
     */
    function updateWebsite(req,res) {
        var updatedWebsite = req.body;
        var wid = req.params.websiteId;
        websiteModel.updateWebsite(wid, updatedWebsite).then(
            function (success) { res.send(200);},
            function (error) { res.statusCode(404).send(error);});
    }
}