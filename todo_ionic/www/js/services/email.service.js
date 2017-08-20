(function(){

    function emailService(){
        return{
            sendHtmlEmail: sendHtmlEmail
        }

        function sendHtmlEmail(to, subject, body){

            cordova.plugins.email.open({
                to:      to,
                subject: subject,
                body:    body,
                isHtml:  true
            });
        }
    }

    angular.module('todo')
           .factory('Email', emailService);

    
})();