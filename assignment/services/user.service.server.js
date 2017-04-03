/*
 * Created by Priyank Kumar on 2/27/17.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, models) {

    /*
     *  Creating a User Model
     */
    var userModel = models.userModel;

    // Generating facebook configuration Object
    var facebookConfig = {
        clientID :'1876601035942674',
        clientSecret: 'be786de9d831f8be92686f37e00403aa',
        callbackURL: 'http://localhost:3000/'
        // clientID     : process.env.FACEBOOK_CLIENT_ID,
       // clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        //callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    /*
     *    Defining the request Handlers
     */

    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    // Adding the login, session and encryption
    app.get("/auth/facebook", passport.authenticate('facebook'));
    app.get("/auth/facebook/callback", passport.authenticate('facebook',{ successRedirect: '/assignment/assignment4/#/user',  failureRedirect: '/assignment/assignment4/#/login' }));

    app.get("/api/loggedIn", loggedIn);

    // POST
    app.post("/api/register", register);
    app.post("/api/login",passport.authenticate('local'), login);
    app.post("/api/logout",logout);
    app.post('/api/user', createUser);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    passport.use('facebook',new FacebookStrategy(facebookConfig,facebookLogin));

    /*
     *    Implementing a local strategy
     */
    function localStrategy(username, password, done) {

        userModel.findUserByUsername(username).then(
            function(user) {
                user = user[0];
                if(user && bcrypt.compareSync(password, user.password))
                    done(null, user);
                else
                    done(null, false);
                },
                function(err) {
                if (err)
                    done(err);
                } );
    }

    /*
     *    Implementing Serialization
     */
    function serializeUser(user, done) {
        done(null, user);
    }

    /*
     *    Implementing Deserialization
     */
    function deserializeUser(user, done) {
        userModel.findUserById(user._id).then(
                function(user){ done(null, user); },
                function(err){ done(err, null); } );
    }

    /*
     *    Implementing FaceBook Strategy
     */
    function facebookLogin(token, refreshToken, profile, done){

        userModel.findFacebookUser(profile.id).then(
            function(fbUser){

                if(fbUser)
                    return done(null,fbUser);
                else
                    fbUser = { username: profile.displayName.replace(/ /g,''),
                               facebook:{ token: token, id: profile.id, displayName: profile.displayName }};

                userModel.createUser(fbUser).then( function(user){ done(null, user); } );
                });
    }

    /*
     *    Create a new user and add to user list
     */
    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(user){ res.json(user); },
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
                function (success) { res.sendStatus(200); },
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
                function (success) { res.sendStatus(200); },
                function (error) { res.statusCode(404).send(error); } );
    }

    /*
     * Login Function
     */
    function login(req, res) {
        res.json(req.user);
    }

    /*
     * LoggedIn Function
     */
    function loggedIn(req, res){

        if(req.isAuthenticated())
            res.send(req.user);
        else
            res.send('0');
    }

    /*
     * LogOut Function
     */
    function logout(req, res){
        req.logout();
        res.sendStatus(200);
    }

    /*
     * Register Function
     */
    function register(req, res) {
        var user = req.body;
        userModel.findUserByUsername(user.username).then(
            function (usr) {
                if (usr.length > 0)
                    res.statusCode(400).send("Username already exist");
                else {
                    user.password = bcrypt.hashSync(user.password);
                    userModel.createUser(user).then(
                        function (user) {
                            req.login(user, function (err) {
                                if (err)
                                    res.status(400).send(err);
                                else
                                    res.json(user);
                            });
                        }
                    );
                }
            },
            function (error) {
                res.statusCode(400).send(error);
            });
    }
};
