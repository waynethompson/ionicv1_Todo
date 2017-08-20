(function () {
    EmailTaskController.$inject = [
        '$scope',
        'Tasks',
        'Email'];

    function EmailTaskController(
        $scope,
        Tasks,
        emailService
    ) {
        $scope.email;

        $scope.closeEmailTask = function(){
            
        }

        $scope.sendEmail = function(){

        }

    }

    angular.module('todo')
        .component('emailtaskpage', {
            templateUrl: 'js/emailPage/emailPage.html',
            controller: EmailTaskController
        });
})();