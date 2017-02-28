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

            // Used for checking if the username is already present.
            var usernameAlreadyPresent=UserService.findUserByUsername(user.username);
            usernameAlreadyPresent.success(function (newUser) {
                if(newUser!=='0'){
                    vm.error="User Name already taken";
                    return;
                }
                else {
                    //Username Not Taken Already
                    if (user.username !== undefined && user.username!=="" && (user.password!==undefined  && user.verifyPassword!==undefined && user.verifyPassword!=="" && user.password!=="") && (user.password === user.verifyPassword) ) {

                        // Setting FirstName LastName and Email
                        user.firstName= user.username;
                        user.lastName=user.username;
                        user.email=user.username + "@gmail.com";

                        //Creating new User.
                        UserService.createUser(user).success(function (createdUser) {
                            if (createdUser) {
                                $location.url("/user/" + createdUser._id);
                            } else {
                                vm.error = "User does not exist";
                            }
                        }).error(function (error) { console.log("HTTP Error Occured"); })
                    }
                    else {
                        if (user.username === undefined || user.username==="") {
                            vm.error = "Please enter User Name";
                        }
                        else if (user.password === undefined || user.verifyPassword === undefined || user.password==="" || user.verifyPassword==="") {
                            vm.error = "Passwords entered Incorrectly";
                        }
                        else if (user.password !== user.verifyPassword) {
                            vm.error = "Passwords don't match";
                        }
                    }
                }
            })
        }
    }
})();
