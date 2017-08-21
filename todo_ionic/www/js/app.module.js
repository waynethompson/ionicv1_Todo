(function () {
    // Please read the README.md file for details of architectural choices.

    angular.module('todo', ['ionic'])

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('list', {
                    url: '/',
                    template: '<listpage></listpage>'
                })
                .state('task', {
                    url: '/task',
                    template: '<taskpage></taskpage>'
                })
                .state('email', {
                    url: '/email',
                    template: '<emailtaskpage></emailtaskpage>'
                });

            $urlRouterProvider.otherwise("/");
        })

        .run(function ($ionicPlatform) {

        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });

})();