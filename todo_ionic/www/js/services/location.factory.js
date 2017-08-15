(function(){

    locationService.$inject = [];

    function locationService(){
        var _location = {};
        updateLocation();

        return {
            location: _location,
            UpdateLocation: updateLocation
        };

        function updateLocation() {
            navigator.geolocation.getCurrentPosition(upladeLocationCallback);
        }

        function upladeLocationCallback(position) {
            _location.latitude = position.coords.latitude;
            _location.longitude = position.coords.longitude;
        }
    }

    angular.module('todo')
           .factory('Location', locationService);

})();