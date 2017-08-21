(function () {
    EmailTaskController.$inject = [
        '$scope',
        '$state',
        '$ionicLoading',
        '$ionicModal',
        'Tasks',
        'Email',
        'Contacts'];

    function EmailTaskController(
        $scope,
        $state,
        $ionicLoading,
        $ionicModal,
        Tasks,
        emailService,
        contactsService
    ) {

        $scope.email = {
            subject: "Todo Tasks"
        };

        $scope.email.html = emailService.getHtml();

        $scope.contacts = [];

        $scope.closeEmailTask = function () {
            $state.go('list');
        }

        $scope.sendEmail = function () {
            $ionicLoading.show({
                template: 'Sending Email...'
              })
            emailService.sendHtmlEmail(
                $scope.email.to,
                $scope.email.subject,
                $scope.email.html,
                function callback(){
                    $ionicLoading.hide();
                    $state.go('list');
                }
            )
            emailService.setHtml("");
        }

        $ionicModal.fromTemplateUrl('js/emailPage/contacts.html', function (modal) {
            $scope.contactsModal = modal;
        }, {
                scope: $scope
            });

        $scope.showContacts = function () {
            console.log("Show contacts clicked")
            $ionicLoading.show();

            contactsService.getContacts().then(function(result){
                $scope.contacts = result;
                $scope.loading = false;
                $ionicLoading.hide();
            }, function(error){
                $ionicLoading.hide();
            });
            $scope.loading = true;
            $scope.contactsModal.show();
        }

        $scope.selectContact = function (contact) {
            $scope.email.to = contact.email;
            $scope.contactsModal.hide();
        }

        $scope.closeContacts = function () {
            $scope.contactsModal.hide();
        }


    }

    angular.module('todo')
        .component('emailtaskpage', {
            templateUrl: 'js/emailPage/emailPage.html',
            controller: EmailTaskController
        });
})();