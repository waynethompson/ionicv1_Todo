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
        'Location',
        'Camera',
        'Email'];

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
        LocationService,
        CameraService,
        EmailService
    ) {

        $scope.tasks = TaskService.Tasks;
        $scope.showDelete = false;

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

        $scope.deleteTask = function (task) {
            console.log(task);
            TaskService.deleteTask(task);
        }

        $scope.closeNewTask = function () {
            $scope.taskModal.hide();
        }

        $scope.editTask= function(task){

        }

        $scope.takePicture = function (options) {
            
                        var options = {
                            quality: 75,
                            targetWidth: 200,
                            targetHeight: 200,
                            sourceType: 1
                        };
            
                        CameraService.getPicture(options).then(function (imageData) {
                            $scope.task.img = imageData;;
                        }, function (err) {
                            console.log(err);
                        });
            
                    };
            
                    // Create the modal
                    $ionicModal.fromTemplateUrl('js/taskPage/new-task.html', function (modal) {
                        $scope.taskModal = modal;
                    }, {
                            scope: $scope
                        });

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
                destructiveButtonClicked: function () {
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