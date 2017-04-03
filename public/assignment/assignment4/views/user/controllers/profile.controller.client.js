(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);


    // RouteParams has the map of passed params in the set listed in the controller.
    function profileController($routeParams, $location, UserService, $rootScope) {

        var vm = this;
        //var userId = $routeParams['uid'];
        var userId = $rootScope.currentUser._id;

        // Function Definition
        vm.update = update;
        vm.deleteUser = deleteUser;
        vm.logout = logout;


        // Init function - Function that will be called every time profileController is instantiated.
        function init() {
            var promise = UserService.findUserById(userId);
            promise.success(function (user){ vm.user = user; })
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

        function logout(){
            UserService.logout().then(
                    function(response){ $rootScope.currentUser = null; $location.url("/login"); },
                    function(error){ $location.url("/login"); } );
        }

        function deleteUser(){
            UserService.deleteUser().then(
                    function(response){ $location.url("/login"); },
                    function(error){ vm.error = "Unable to delete the user"; });
        }
    }
})();
