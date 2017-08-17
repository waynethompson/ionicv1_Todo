(function() {

    taskFactory.$inject = ['Location'];
    function taskFactory(LocationService) {
        var tasks = [];

        return {
            Tasks:tasks,            
            all: getAll,
            save: save,
            newtask: newTask,
            getLastActiveIndex: getLastActiveIndex,
            setLastActiveIndex: setLastActiveIndex,
            clearList: clearList,
            addTask: addTask,
            deleteTask: deleteTask
        }

        function getAll() {
            // TODO - change this to use sql
            var tasksString = window.localStorage['tasks'];
            if(taskString) {
                tasks = angular.fromJson(taskString);
            }
            return tasks;
        }

        function save(tasks) {
            window.localStorage['tasks'] = angular.toJson(tasks);
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

        function clearList(){
            // TODO clear this properly and save to database
            tasks.length = 0;
        }

        function addTask(task){
            tasks.push({
                title: task.title,
                description: task.description,
                completed: false,
                location: LocationService.location,
                created: Date.now()
            });
        }

        function deleteTask(task){
            tasks.splice(tasks.indexOf(task), 1);
        }
    }

    angular.module('todo')
           .factory('Tasks', taskFactory);

})();