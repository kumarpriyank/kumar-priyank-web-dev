
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
        function login(username, password, loginForm) {

            if(loginForm.$valid){
                UserService.login(username, password).then(
                    function (response) {
                        if(response.data)
                            $location.url("/user");
                    },
                    function (error) {
                        vm.error = "User not found. Please try again";
                    });
            } else
                vm.error = "Some error occured";
        }
    }
})();
