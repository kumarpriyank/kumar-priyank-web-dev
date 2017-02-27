(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "Wonder@alice.com"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "Marley@bob.com"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "Garcia@andrew.com" },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "Annunzi@Jose.com" }
        ];

        var api = {
            "createUser":createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser":updateUser,
            "deleteUser":deleteUser
        };
        return api;

        // Creating a user
        function createUser(user) {
            user._id = (new Date()).getTime();
            users.push(user);
            return angular.copy(user);
        }

        // Find user by Id
        function findUserById(userId) {
          for (var u in users) {
            if( users[u]._id == userId)
              return users[u];
          }
          return null;
        }

        // Find user by username
        function findUserByUsername(username) {
          for (var u in users) {
            if( users[u].username == username)
              return angular.copy(users[u]);
          }
          return null;
        }

        // Find users by Credentials
        function findUserByCredentials(username, password) {
            for(var u in users) {
                if( users[u].username == username &&
                    users[u].password == password ) {
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        // Update user
        function updateUser(userId, user) {
          for(var u in users) {
              if( users[u]._id == userId ) {
                  users[u].email = user.email;
                  users[u].firstName = user.firstName;
                  users[u].lastName = user.lastName;
                  return user;
              }
          }
            return null;
        }

        // Delete the user
        function deleteUser(userId) {
          for(var u in users) {
              if (users[u]._id == userId) {
                  users.splice(users.indexOf(u), 1);
              }
          }
        }
    }
})();
