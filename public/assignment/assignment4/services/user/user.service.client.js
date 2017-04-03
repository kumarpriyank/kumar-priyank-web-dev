(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http) {

        var api = {
            "createUser":createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser":updateUser,
            "deleteUser":deleteUser,
            // Added owing to security Module
            "login":login,
            "logout":logout,
            "loggedIn":loggedIn,
            "register":register
        };
        return api;

        // Creating a user
        function createUser(user) {
            return $http.post("/api/user/", user);
        }

        // Find user by Id
        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        // Find user by username
        function findUserByUsername(username) {
            return $http.get("/api/user?username=" + username);
        }

        // Find users by Credentials Server
        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        // Update user
        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        // Delete the user
        function deleteUser(userId) {
            return $http.delete("/api/user/" + userId);
        }

        // Login the user
        function login(username, password) {
            var user = { username:username, password:password};
            return $http.post("/api/login", user);
        }

        // Logout the user
        function logout(){
            return $http.post("/api/logout/");
        }

        // Logged in User
        function loggedIn() {
            return $http.get("/api/loggedIn/");
        }

        function register(user) {
            return $http.post("/api/register",user);
        }
    }
})();
