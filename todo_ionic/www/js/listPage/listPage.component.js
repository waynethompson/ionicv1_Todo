(function () {
    ListPageController.$inject = [
        '$scope',
        '$state',
        '$timeout',
        '$ionicModal',
        '$ionicSideMenuDelegate',
        '$ionicActionSheet',
        '$ionicPopover',
        '$timeout',
        'Tasks',
        'Location',
        'Camera',
        'Email'];

    function ListPageController(
        $scope,
        $state,
        $timeout,
        $ionicModal,
        $ionicSideMenuDelegate,
        $ionicActionSheet,
        $ionicPopover,
        $timeout,
        TaskService,
        LocationService,
        CameraService,
        EmailService
    ) {
        $scope.tasks = TaskService.Tasks;
        $scope.showDelete = false;
        $scope.isNewTask = false;
        $scope.showCompleted = true;

        $scope.filterByCompleted = function(task) {
            if (!$scope.showCompleted && task.completed) 
                return false;

            return true;
        };

        // Task Methods
        $scope.newTask = function () {
            // setup for new task
            $scope.isNewTask = true;
            $scope.task = { complete: false };

            // refresh the location
            LocationService.UpdateLocation();
            $scope.location = LocationService.location;

            // show the task screen
            $scope.taskModal.show();
        };

        $scope.saveTask = function (task) {
            if (!task) {
                return;
            }
            TaskService.addTask(task);

            // hide the task screen
            $scope.taskModal.hide();
        };

        $scope.deleteTask = function (task) {
            TaskService.deleteTask(task);
        }

        $scope.closeNewTask = function () {
            $scope.taskModal.hide();
            $scope.isNewTask = false;
        }

        $scope.editTask = function (task) {
            $scope.isNewTask = false;
            TaskService.currentTask = task;
            $scope.task = TaskService.currentTask;
            $scope.taskModal.show();
        }

        // Create the modal
        $ionicModal.fromTemplateUrl('js/taskPage/task.html', function (modal) {
            $scope.taskModal = modal;
        }, {
                scope: $scope
            });


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
                            //EmailService.
                            break;
                        case 1:

                            break;
                        case 3:

                            break;
                    }
                    $state.go('email');
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
        // this is again called when  a task is created to keep it updated.        
        $scope.location = LocationService.location;
    }

    angular.module('todo')
        .component('listpage', {
            templateUrl: 'js/listPage/listPage.html',
            controller: ListPageController
        });
})();