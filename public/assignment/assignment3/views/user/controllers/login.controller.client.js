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

        function login(user) {

                var user = UserService.findUserByCredentials(user.username, user.password);
                if(user) {
                    $location.url("/user/"+user._id);
                } else {
                    vm.error = "User not found";
                }
        }
    }
})();