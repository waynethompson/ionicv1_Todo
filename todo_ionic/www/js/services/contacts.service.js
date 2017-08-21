(function () {
    contactsService.$inject = ['$q'];

    function contactsService($q) {

        var contactList = [];
        return {
            getContacts: getContacts,
            contactList: contactList
        }

        function getContacts() {
            var q = $q.defer();
            var contactFindOptions = {
                filter: "",
                multiple: true,
            };
            if(navigator.contacts){
            navigator.contacts.find(
                ["displayName", "emails"],
                function contactSuccess(result) {
                    q.resolve(result);
                },
                function contactError(error) {
                    q.reject(error);
                },
                contactFindOptions);
            }else{
                q.resolve([{ displayName: "test", email:"test@somewhere.com" }]);
            }
            return q.promise;

        }
    }

    angular.module('todo')
        .factory('Contacts', contactsService);


})();