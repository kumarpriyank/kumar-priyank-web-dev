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
            "deleteUser":deleteUser
        };
        return api;

        // Creating a user
        function createUser(user) {
            //user._id = (new Date()).getTime() + "";
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
    }
})();
