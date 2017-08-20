(function(){
    
        function contactsService(){
            return{
                getContacts: getContacts
            }
    
            function getContacts(){
    



            }
        }
    
        angular.module('todo')
               .factory('Contacts', contactsService);
    
        
    })();