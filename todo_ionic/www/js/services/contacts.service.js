(function(){
    
        function contactsService(){
            var contactList = [];
            return{
                getContacts: getContacts,
                contactList: contactList
            }
    
            function getContacts(){
                var contactFindOptions = {
                    filter: "",
                    multiple: true,
                  };
                  
                navigator.contacts.find(
                    ["name", "emails"], 
                    contactSuccess, 
                    contactError, 
                    contactFindOptions);
            }

            function contactSuccess(result){
                contactList.push(result)
            }

            function contactError(error){
                console.log(error);
            }

        }
    
        angular.module('todo')
               .factory('Contacts', contactsService);
    
        
    })();