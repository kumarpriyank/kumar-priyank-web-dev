/**
 * Created by Priyank Kumar on 2/27/17.
 */
module.exports= function (app, models) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgetModel = models.widgetModel;
    var pageModel = models.pageModel;

    /*
     *    Defining the list of widgets

    var widgets = [
        {_id: "123", widgetType: "HEADER", pageId: "321", size:"2", text: "GIZMODO"},
        {_id: "234", widgetType: "HEADER", pageId: "321", size:"4", text: "Loren Ipsum 321"},
        {_id: "345", widgetType: "IMAGE", text:"Image1",pageId: "321", width:"100%", url: "http://lorempixel.com/400/200/"},
        {_id: "456", widgetType: "HTML", pageId: "321", text: "<p> Lorem Ipsum 321</p>"},
        {_id: "567", widgetType: "HEADER", pageId: "321", size:"4", text: "Lorem Ipsum"},
        {_id: "678", widgetType: "YOUTUBE", pageId: "321", width:"100%", url: "http://youtube.com/AM2Ivdi9c4E"},
        {_id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem Ip</p>"},
        {_id: "239", widgetType: "HEADER", pageId: "324", size:"4", text: "Loren Ipsum"},
        {_id: "349", widgetType: "IMAGE", text:"Image1", pageId: "324", width:"100%", url: "http://lorempixel.com/400/200/"},
        {_id: "459", widgetType: "HTML", pageId: "324", text: "<p> Lorem</p>" },
        {_id: "679", widgetType: "YOUTUBE", pageId: "324", width:"100%", url: "http://youtube.com/AM2Ivdi9c4E"} ];
     */


    /*
     *    Defining the request Handlers
     */
    app.get("/api/page/:pageId/widget",findWidgetsByPageId);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.put("/api/widget/:widgetId",updateWidget);
    app.post("/api/page/:pageId/widget",createWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/page/:pageId/widget",reorderWidget);

    /*
     *    Find the Widgets by PageID
     */
    function findWidgetsByPageId(req,res) {
        var pid = req.params.pageId;
        widgetModel.findWidgetsByPageId(pid).then(
            function (widgets) { res.json(widgets); },
            function (error) { res.sendStatus(404).send(error); });
    }

    /*
     *   Find widget by Widget ID
     */
    function findWidgetById(req,res) {
        var widgetId=req.params.widgetId;
        widgetModel.findWidgetById(widgetId).then(
            function (widget) { res.json(widget); },
            function (error) { res.statusCode(404).send(error); });
    }

    /*
     *  Update Widget
     */
    function updateWidget(req,res) {
        var updatedWidget = req.body;
        var widgetId = req.params.widgetId;

        widgetModel.updateWidget(widgetId, updatedWidget).then(
            function (success) { res.json(success); },
            function (error) { res.statusCode(404).send(error); });
    }


    /*
     *    Create a new Widget
     */
    function createWidget(req,res) {

        var pageId = req.params.pageId;
        var widget = req.body;

        // Create New Page - 1) Create a new page and insert into the page table
        // 2) Update the pages array of websites with the latest created page Id.

        // Getting hold of the page by the page Id provided
        var pageObjectPromise = pageModel.findPageById(pageId);

        // Adding the Widget
        var newWidgetPromise = widgetModel.createWidget(pageId, widget);



        // Now we will use Promise all to work only when we get both the calls return success.
        // Promise.all() returns a single Promise that resolves when all of the promises in the iterable argument have resolved,
        // or rejects with the reason of the first promise that rejects.

        Promise.all([pageObjectPromise, newWidgetPromise]).then(
            function (success) {
                // Adding websites to widgets table websites array
                success[0].widgets.push(success[1]._id);

                // Updating the website table also with the updated pages
                pageModel.updatePage(pageId, success[0]).then(
                    function (page) { res.json(success[1]); },
                    function (error1) { res.statusCode(500).send(error1); }); },
            function (error) {
                res.statusCode(500).send(error);
            });
    }



    /*
     *    Delete a  Widget by Widget Id
     */
    function deleteWidget(req,res) {
        var widgetId=req.params.widgetId;
        widgetModel.deleteWidget(widgetId).then(
            function (success) { res.json(success); },
            function (error) { res.statusCode(404).send(error); });
    }

    /*
     *    Upload an Image
     */
    function uploadImage(req, res) {

        // Getting the ID's
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var widgetId      = req.body.widgetId;
        // Getting Width
        var width         = req.body.width;
        var myFile        = req.file;
        var text          = req.body.text;

        if(myFile) {
            // Name of file on the original computer
            var originalname = myFile.originalname;
            // The name by which the file will be put in the upload  folder
            var filename = myFile.filename;
            // The absolute path of the uploaded file
            var path = myFile.path;
            // The destination folder where the file is stored
            var destination = myFile.destination;
            // Size of file
            var size = myFile.size;
            // Mime type of the file
            var mimetype = myFile.mimetype;

            widgetModel.findWidgetById(widgetId).then(
                function(widget){
                    widget.url = "/uploads/" + filename;

                    if(width)
                        widget.width = width;
                    else
                        widget.width = "100%";

                    widgetModel.updateWidget(widgetId,widget).then(
                        function(success){ res.send(200); },
                        function(error){ res.statusCode(404).send(error); });
                    },

                function(error){ res.statusCode(404).send(error); });

            res.redirect("/assignment/assignment4/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        }
        else
            res.redirect("/assignment/assignment4/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
    }

    /*
     *    Reorder Widgets
     */
    function reorderWidget(req,res){
        var pageId = req.params.pageId;
        var s = parseInt(req.query.start);
        var e = parseInt(req.query.end);

        widgetModel.reorderWidget(pageId,s,e).then(
            function(success){ res.send(200); },
            function(error){ res.statusCode(404).send(error); });
    }
}