(function () {
    ListPageController.$inject = [
        '$scope',
        '$timeout',
        '$ionicModal',
        '$ionicSideMenuDelegate',
        '$ionicActionSheet',
        '$ionicPopover',
        '$timeout',
        'Tasks',
        'Projects',
        'Location'];

    function ListPageController(
        $scope,
        $timeout,
        $ionicModal,
        $ionicSideMenuDelegate,
        $ionicActionSheet,
        $ionicPopover,
        $timeout,
        TaskService,
        ProjectsService,
        LocationService
    ) {

        $scope.tasks = TaskService.Tasks;

        // Create the modal
        $ionicModal.fromTemplateUrl('js/taskPage/new-task.html', function (modal) {
            $scope.taskModal = modal;
        }, {
                scope: $scope
            });

        // Task Methods
        $scope.createTask = function (task) {
            if (!task) {
                return;
            }

            TaskService.addTask(task);
            $scope.taskModal.hide();
        };

        $scope.newTask = function () {
            $scope.task = {};
            LocationService.UpdateLocation();
            $scope.location = LocationService.location;
            $scope.taskModal.show();
        };

        $scope.deleteTask = function () { }

        $scope.closeNewTask = function () {
            $scope.taskModal.hide();
        }

        // $scope.toggleProjects = function () {
        //     $ionicSideMenuDelegate.toggleLeft();
        // };

        // Triggered on a button click, or some other target
        $scope.showActionSheet = function () {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '<b>Share</b> all' },
                    { text: '<b>Share</b> completed' },
                    { text: '<b>Share</b> incomplete' }
                   
                ],
                destructiveText: 'Clear List',
                titleText: 'Task Function',
                cancelText: 'Cancel',
                cancel: function () {
                    // do nothing
                },
                buttonClicked: function (index) {
                    console.log(index);
                    switch (index) {
                        case 0:

                            break;
                        case 1:

                            break;
                        case 3:

                            break;

                    }
                    return true;
                },
                destructiveButtonClicked: function(){
                    TaskService.clearList();

                    //TODO - remove this
                    $scope.tasks = TaskService.Tasks;
                    
                }
            });

            // hide the sheet after two seconds
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

        // // Try to create the first project, make sure to defer
        // // this by using $timeout so everything is initialized
        // // properly
        // $timeout(function () {
        //     if ($scope.projects.length == 0) {
        //         while (true) {
        //             var projectTitle = prompt('Your first project title:');
        //             if (projectTitle) {
        //                 createProject(projectTitle);
        //                 break;
        //             }
        //         }
        //     }
        // }, 1000);

        // storing the location when the app is opened. 
        // this is again called when  a task is created        
        $scope.location = LocationService.location;
    }

    angular.module('todo')
        .component('listpage', {
            templateUrl: 'js/listPage/listPage.html',
            controller: ListPageController
        });
})();