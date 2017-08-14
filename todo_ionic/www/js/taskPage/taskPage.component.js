(function () {
    TaskPageController.$inject = [
        '$scope',
        '$timeout',
        '$ionicModal',
        '$ionicSideMenuDelegate',
        '$ionicActionSheet',
        '$ionicPopover',
        '$timeout',
        'Tasks',
        'Projects'];

    function TaskPageController(
        $scope,
        $timeout,
        $ionicModal,
        $ionicSideMenuDelegate,
        $ionicActionSheet,
        $ionicPopover,
        $timeout,
        Tasks,
        Projects
    ) {

    }

    angular.module('todo')
        .component('taskpage', {
            templateUrl: 'js/taskPage/taskPage.html',
            controller: TaskPageController
        });
})();