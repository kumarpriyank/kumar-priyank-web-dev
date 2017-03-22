/**
 * Created by Priyank Kumar on 2/27/17.
 */
module.exports = function(app, models) {


    /*
     *    Defining the list of users

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "Wonder@alice.com"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "Marley@bob.com"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "Garcia@andrew.com" },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "Annunzi@Jose.com" }];
     */


    /*
     *  Creating a User Model
     */
    var userModel = models.userModel;

    /*
     *    Defining the request Handlers
     */
    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);


    /*
     *    Create a new user and add to user list
     */
    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(user){ console.log(user); res.json(user); },
                function(error){ res.statusCode(400).send(error); }
            );
    }

    /*
     *    Find User Handler Function - Decides based on the parameters what it needs to invoke.
     */
    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if(query.password && query.username) {
            findUserByCredentials(req, res);
        } else if(query.username) {
            findUserByUsername(req, res);
        }
    }


    /*
     *   Find the user by credentials
     */
    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        userModel.findUserByCredentials(username,password)
            .then(
                function (user) { res.json(user);},
                function (error) { res.status(404).send(error); }
            );
    }


    /*
     *    Find the user by username
     */
    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel.findUserByUsername(username)
            .then(
                function (user) { res.json(user); } ,
                function (error) { res.statusCode(404).send(error); } );
    }


    /*
     *    Find the user by userId
     */
    function findUserById(req, res) {
        var userId = req.params.uid;
        userModel.findUserById(userId)
            .then (
                function (user) { res.send(user); },
                function (error) { res.statusCode(404).send(error); }
            );
    }


    /*
     *    Update the user having userId specified
     */
    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.uid;
        userModel.updateUser(userId,user)
            .then (
                function (success) { res.send(200); },
                function (error) { res.statusCode(404).send(error); }
            );
    }

    /*
     *    Defining the list of users
     */
    function deleteUser(req, res) {
        var userId = req.params.uid;
        userModel
            .deleteUser(userId)
            .then(
                function (success) { res.send(200); },
                function (error) { res.statusCode(404).send(error); } );
    }
}
