# Overview
The Project is based on Ionic V1.
AngularJs components were used to ensure easy compatability with Angular 4 in future.

Coding style is as per [Angular 1 Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#modules)

# Cordova plugings used
GeoLocation is found using [cordova-plugin-geolocation](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/)

camera accessed with [cordova-plugin-camera](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/)


Moving between pages is done using [Ionic Nav View](http://ionicframework.com/docs/v1/api/directive/ionNavView/)


# Security
To ensure that code cannot be decompiled and read easily [cordova-uglify](https://github.com/rossmartin/cordova-uglify) was added

Local storage was used as per the requirements but a prefered solution would be to use an encrypted sql database like https://github.com/litehelpers/Cordova-sqlcipher-adaptercor
