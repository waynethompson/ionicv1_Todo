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

        $scope.filterByCompleted = function (task) {
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
            // wait for update and then set location. This could be done in a promise from Location Service
            $timeout(function () {
                $scope.task.location = LocationService.location;
            }, 1000);

            // show the task screen
            $scope.taskModal.show();
        };

        $scope.saveTask = function (task) {
            if (!task) {
                return;
            }
            if ($scope.isNewTask) {
                TaskService.addTask(task);
                $scope.isNewTask = false;
            } else {
                TaskService.saveAll();
            }

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
            TaskService.currentTask = task;
            $scope.task = TaskService.currentTask;
            $scope.taskModal.show();
        }

        // Create the modal for task editing
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

                    var selectedTasks;

                    // filter tasks based on button clicked
                    switch (index) {
                        case 0:
                            selectedTasks = $scope.tasks;
                            break;
                        case 1:
                            selectedTasks = $scope.tasks.filter(function (task) {
                                return task.completed;
                            })
                            break;
                        case 2:
                            selectedTasks = $scope.tasks.filter(function (task) {
                                return !task.completed;
                            })
                            break;
                    }

                    // create html from tasks
                    var html = TaskService.taskArrayAsHtml(selectedTasks);
                    EmailService.setHtml(html);

                    // go to email page
                    $state.go('email');
                    return true;
                },
                destructiveButtonClicked: function () {
                    TaskService.clearList();
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