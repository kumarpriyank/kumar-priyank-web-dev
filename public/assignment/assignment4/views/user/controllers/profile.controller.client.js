(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);


    // RouteParams has the map of passed params in the set listed in the controller.
    function profileController($routeParams, $location, UserService) {

        var vm = this;
        var userId = $routeParams['uid'];

        // Function Definition
        vm.update = update;

        // Init function - Function that will be called every time profileController is instantiated.
        function init() {
            var promise = UserService.findUserById(userId);
            promise.success(function (user){ console.log(user); vm.user = user; })
                .error(function (error) { vm.error = "Http Error Occured"; });
        } init();



        function update(newUser) {
            if (newUser.email == undefined || newUser.firstName == undefined || newUser.lastName == undefined) {
                vm.error = "Please enter user details";
            } else {
                    UserService.updateUser(userId, newUser)
                        .success( function (user) {
                            if (user == null) {
                                vm.error = "Unable to Update User Details";
                            }
                            else {
                                vm.message = "User Successfully Updated";
                        } });
            }
        }
    }
})();
