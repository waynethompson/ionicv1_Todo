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

    // service is used rather than a factory because it doesn't need to maintain state.
    angular.module('todo')
        .factory('Camera', cameraService);



})();