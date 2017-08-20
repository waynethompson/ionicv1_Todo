(function () {
    
    cameraService.$inject = ['$q'];

    function cameraService($q) {

        return {
            getPicture: function (options) {
                var q = $q.defer();
                
                navigator.camera.getPicture(function (result) {
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        }

        function cameraCallback(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }
    }

    angular.module('todo')
        .factory('Camera', cameraService);



})();