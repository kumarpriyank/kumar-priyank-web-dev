(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);
// RouteParams has the map of passed params in the set listed in the controller.
    function profileController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        var user = UserService.findUserById(userId);
        vm.user = user;
        vm.update = update;


        // event handler

        function init() {
        }
        init();

        function update(user) {
            if (user.email == undefined || user.firstName == undefined || user.lastName == undefined) {
                vm.error = "Unable to Update User Details";
            } else {
                var user = UserService.updateUser(userId, user);
                if (user == null) {
                    vm.error = "Unable to Update User Details";
                } else {
                    vm.message = "User Successfully Updated";
                }
            }
        }

    }
})();
