(function () {

    function emailService() {

        return {
            sendHtmlEmail: sendHtmlEmail,
            setHtml: setHtml,
            getHtml: getHtml
        }

        function sendHtmlEmail(to, subject, body, callback) {
            // check is cordova is loaded
            if (window.cordova) {
                cordova.plugins.email.open({
                    to: to,
                    subject: subject,
                    body: body,
                    isHtml: true
                },
                callback);
            }else{
                // for testing in browser
                console.error("Cordova is not defined");
                callback();
            }
        }

        var _html = "";
        function setHtml(html) {
            _html = html;
        }
        function getHtml() {
            return _html;
        }

    }

    angular.module('todo')
        .factory('Email', emailService);


})();