/**
 * Created by Priyank Kumar on 02/27/17.
 */

//IFFE statement to protect the NameSpace

(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider, $locationProvider, $httpProvider) {

            $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
            $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/", { redirectTo:"/login"})
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model" })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"})
            .when("/user", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedIn:checkLoggedIn}})/*
            .when("/user/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"}) */
            .when("/user/:uid/website", {
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model",
                resolve: { loggedIn:checkLoggedIn}})
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/templates/website-new.view.client.html",
                controller: "WebsiteController",
                controllerAs: "model",
                resolve: { loggedIn:checkLoggedIn}})
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/templates/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model",
                resolve: { loggedIn:checkLoggedIn}})
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/templates/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model",
                resolve: { loggedIn:checkLoggedIn}})
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/templates/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model",
                resolve: { loggedIn:checkLoggedIn}})
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/templates/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model",
                resolve: { loggedIn:checkLoggedIn}})
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model",
                resolve: { loggedIn:checkLoggedIn}})
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model",
                resolve: { loggedIn:checkLoggedIn}})
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/templates/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model",
                resolve: { loggedIn:checkLoggedIn}})
            .when("/user/:userId/website/:wid/page/:pid/widget/:wgid/flickr", {
                templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })
            .otherwise({redirectTo:"/login"});
    };

    function checkLoggedIn(UserService, $location, $q, $rootScope) {
            var deferred =$q.defer();
            UserService.loggedIn().then(
                function (response) {

                    var user = response.data;
                    if(user == 0) {
                        $rootScope.currentUser=null;
                        deferred.reject();
                        $location.url("/login");
                    } else {
                        $rootScope.currentUser = user;
                        console.log(user);
                        deferred.resolve();
                    }
                },
                function (error) {
                        $location.url("/login");
                } );
            return deferred.promise;
    }
})();