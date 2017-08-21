(function () {

    taskFactory.$inject = ['Location'];
    function taskFactory(LocationService) {

        var tasks = getAll();

        return {
            Tasks: tasks,
            currentTask: {},
            all: getAll,
            save: save,
            saveAll: saveAll,
            newtask: newTask,
            getLastActiveIndex: getLastActiveIndex,
            setLastActiveIndex: setLastActiveIndex,
            clearList: clearList,
            addTask: addTask,
            deleteTask: deleteTask,
            taskArrayAsHtml: taskArrayAsHtml
        }

        function getAll() {

            if (localStorage.getItem('tasks') != null) {
                tasks = angular.fromJson(localStorage.getItem('tasks'));
            } else {
                tasks = [];
            }

            return tasks;
        }

        function save(tasks) {
            window.localStorage['tasks'] = angular.toJson(tasks);
        }

        function saveAll() {
            save(tasks);
        }

        function newTask(taskTitle) {
            // Add a new task
            return {
                title: taskTitle,
                tasks: []
            };
        }

        function getLastActiveIndex() {
            return parseInt(window.localStorage['lastTaskActiveTask']) || 0;
        }

        function setLastActiveIndex(index) {
            window.localStorage['lastTaskActiveTask'] = index;
        }

        function clearList() {
            // TODO clear this properly and save to database
            tasks.length = 0;
        }

        function addTask(task) {
            tasks.push({
                title: task.title,
                description: task.description,
                completed: false,
                location: LocationService.location,
                created: Date.now()
            });

            saveAll();
        }

        function deleteTask(task) {
            tasks.splice(tasks.indexOf(task), 1);
            saveAll();
        }

        function taskArrayAsHtml(selectedTasks) {
            var output = '<ul>';
            if (selectedTasks) {
                for (var index = 0; index < selectedTasks.length; index++) {
                    var element = selectedTasks[index];
                    output += '<li><h2>' + element.title + '</h2><p>' +
                        element.description +
                        '</p></li>';
                }
            }
            output += '</ul>';

            return output;
        }
    }

    angular.module('todo')
        .factory('Tasks', taskFactory);

})();