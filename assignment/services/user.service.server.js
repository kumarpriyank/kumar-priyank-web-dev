/**
 * Created by Priyank Kumar on 2/27/17.
 */
module.exports = function(app) {

    /*
     *    Defining the list of users
     */
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "Wonder@alice.com"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "Marley@bob.com"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "Garcia@andrew.com" },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "Annunzi@Jose.com" }];

    /*
     *    Defining the request Handlers
     */
    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    /*
     *    Defining the list of users
     */
    function deleteUser(req, res) {
        var userId = req.params.uid;
        for(var u in users) {
            if(users[u]._id == userId) {
                users.splice(u, 1);
            }
        }
        res.send(200);
    }

    /*
     *    Update the user having userId specified
     */
    function updateUser(req, res) {
        // BOdy is not retrieving the value
        var user = req.body;
        var userId = req.params.uid;
        for(var u in users) {
            if(users[u]._id == userId) {
                users[u].email = user.email;
                users[u].firstName = user.firstName;
                users[u].lastName = user.lastName;

                res.json(users[u]);
                return;
            }
        }
        res.send(404);
    }

    /*
     *    Create a new user and add to user list
     */
    function createUser(req, res) {
        var user = req.body;
        users.push(user);
        res.send(user);
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
        for(var u in users) {
            if(users[u].username === username &&
                users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    /*
     *    Find the user by username
     */
    function findUserByUsername(req, res) {
        var username = req.query.username;
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    /*
     *    Find the user by userId
     */
    function findUserById(req, res) {
        var userId = req.params.uid;
        for(var u in users) {
            if(users[u]._id == userId) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }
}
