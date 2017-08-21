(function () {
    EmailTaskController.$inject = [
        '$scope',
        '$state',
        'Tasks',
        'Email'];

    function EmailTaskController(
        $scope,
        $state,       
        Tasks,
        emailService
    ) {
        $scope.email;

        $scope.closeEmailTask = function(){
            $state.go('list');   
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