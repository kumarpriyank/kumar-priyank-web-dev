(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {
        var vm = this;

        // event handlers
        vm.register = register;

        function init() {
        }
        init();

        function register(user) {

            if (user == undefined || user.username == undefined || user.password == undefined || user.password != user.verifyPassword) {
                vm.error = "Error Occured in User Creation "
            } else {
                var user = UserService.createUser(user);
                $location.url("/user/"+user._id);

            }
        }
    }
})();
