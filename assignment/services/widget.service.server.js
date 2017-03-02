/**
 * Created by Priyank Kumar on 2/27/17.
 */
module.exports= function (app) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    /*
     *    Defining the list of widgets
     */
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

    /*
     *    Defining the request Handlers
     */
    app.get("/api/page/:pageId/widget",findWidgetsByPageId);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.put("/api/widget/:widgetId",updateWidget);
    app.post("/api/page/:pageId/widget",createWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    /*
     *    Find the Widgets by PageID
     */
    function findWidgetsByPageId(req,res) {
        var pid = req.params.pageId;
        var result = [];
        for(var w in widgets) {
            if(widgets[w].pageId == pid) {
                result.push(widgets[w]);
            }
        }
        res.json(result);
    }


    /*
     *   Find widget by Widget ID
     */
    function findWidgetById(req,res) {
        var widgetId=req.params.widgetId;
        for (var w in widgets){
            if(widgets[w]._id == widgetId){
                res.json(widgets[w]);
                return;
            }
        }
        res.sendStatus(400);
    }

    /*
     *  Update Widget
     */
    function updateWidget(req,res) {
        var updatedWidget = req.body;
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id == widgetId){
                widgets[w] = updatedWidget;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    /*
     *    Create a new Widget
     */
    function createWidget(req,res) {

        var pageId = req.params.pageId;
        var widget = req.body;
        widget.pageId = pageId;
        widget._id =  new Date().getTime()+"";
        widgets.push(widget);
        res.json(widget);
    }

    /*
     *    Delete a  Widget by Widget Id
     */
    function deleteWidget(req,res) {
        var widgetId=req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id == widgetId){
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
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

            for (var w in widgets) {
                if (widgets[w]._id == widgetId) {
                    widgets[w].text = text;
                    widgets[w].url = "/uploads/" + filename;
                    if(width){
                        widgets[w].width = width;
                    }else{
                        widgets[w].width = "100%";
                    }

                }
            }
            res.redirect("/assignment/assignment4/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        }else {
            res.redirect("/assignment/assignment4/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        }
    }
}