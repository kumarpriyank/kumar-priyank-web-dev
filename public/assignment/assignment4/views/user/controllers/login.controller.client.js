
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);
    
    function loginController($location, UserService) {

        // Assigning the instance to the variable
        var vm = this;

        // Event Handlers: Handle events happening on the View
        vm.login = login;

        // Function that will be called every time loginController is instantiated.
        // Nothing to do so leaving it blank
        function init() {
        }
        init();

        // Defining the login function, that handles the login
        function login(user)
        {
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise.success(function (user) {
                if(user !== "0") {
                    $location.url("/user/"+user._id);
                } else {
                    vm.error = "User not found";
                }})
                .error(function (error) { console.log("Cannot get HTTP"); });
        }
    }
})();