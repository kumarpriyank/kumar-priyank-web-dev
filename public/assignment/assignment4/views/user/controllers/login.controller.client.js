
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);
    
    function loginController($location, UserService) {

        // Assigning the instance to the variable
        var vm = this;

        // Event Handlers: Handle events happening on the View
        vm.login = login;

        // Function that will be called every time loginController is instantiated. Nothing to do so leaving it blank
        function init() {} init();

        // Defining the login function, that handles the login
        function login(user) {
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise.then(
                function (res) { var loginUser = res.data; $location.url("/user/"+loginUser._id); },
                function (error) { vm.error = "User not found"; } );
        }
    }
})();
