(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", newWebsiteController);

    function newWebsiteController($location, UserService) {
        var vm = this;

        // event handlers
        vm.login = login;

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
