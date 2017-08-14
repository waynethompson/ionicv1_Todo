(function(){

    TodoController.$inject = [
        '$scope',
        '$timeout',
        '$ionicModal',
        '$ionicSideMenuDelegate',
        '$ionicActionSheet',
        '$ionicPopover',
        '$timeout',
        'Tasks',
        'Projects'];

    function TodoController(
        $scope,
        $timeout,
        $ionicModal,
        $ionicSideMenuDelegate,
        $ionicActionSheet,
        $ionicPopover,
        $timeout,
        Tasks,
        Projects
    ) {
        var vm = this;
        vm.Tasks = Tasks.Tasks;

        // Grab the last active, or the first project
        $scope.activeProject = Projects.getActiveProject();

        // Create our modal
        $ionicModal.fromTemplateUrl('new-task.html', function (modal) {
            $scope.taskModal = modal;
        }, {
                scope: $scope
            });

        $scope.createTask = function (task) {
            if (!$scope.activeProject || !task) {
                return;
            }
            $scope.activeProject.tasks.push({
                title: task.title,
                description: task.description,
                completed: false,
                location: $scope.location
            });
            $scope.taskModal.hide();

            // Inefficient, but save all the projects
            Projects.save($scope.projects);

            task.title = "";
        };

        $scope.newTask = function () {
            $scope.taskModal.show();
        };

        $scope.closeNewTask = function () {
            $scope.taskModal.hide();
        }

        // $scope.toggleProjects = function () {
        //     $ionicSideMenuDelegate.toggleLeft();
        // };


        // $ionicPopover.fromTemplateUrl('CreateItem.html', {
        //     scope: $scope
        // })
        //     .then(function (popover) {
        //         $scope.popover = popover;
        //     });


        // $scope.openPopover = function ($event) {
        //     $scope.popover.show($event);
        // };

        // Triggered on a button click, or some other target
        $scope.showActionSheet = function () {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '<b>Share</b> This' },
                    { text: 'Move' }
                ],
                destructiveText: 'Delete',
                titleText: 'Modify your album',
                cancelText: 'Cancel',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    return true;
                }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function () {
                hideSheet();
            }, 2000);

        };

        $scope.getPicture = function () {
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI
            });

            function onSuccess(imageURI) {
                var image = document.getElementById('myImage');
                image.src = imageURI;
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
        }

        // Try to create the first project, make sure to defer
        // this by using $timeout so everything is initialized
        // properly
        $timeout(function () {
            if ($scope.projects.length == 0) {
                while (true) {
                    var projectTitle = prompt('Your first project title:');
                    if (projectTitle) {
                        createProject(projectTitle);
                        break;
                    }
                }
            }
        }, 1000);

        $scope.location = {};
        updateLocation();
        function updateLocation() {
            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.location.latitude = position.coords.latitude;
                $scope.location.longitude = position.coords.longitude;
            });
        }
    }
    
    angular.module('todo')
            .component('ToDoApp', {
            templateUrl: 'templates/todoApp.html',
            controller: TodoController
            // bindings: {
            //     hero: '='
            // }
            });
})();