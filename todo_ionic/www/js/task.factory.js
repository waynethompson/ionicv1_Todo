(function() {

    function TaskFactory() {
        var tasks = [];

        return {
            Tasks:tasks,
            
            all: function() {
                // TODO - change this to use sql
                var tasksString = window.localStorage['tasks'];
                if(taskString) {
                    tasks = angular.fromJson(taskString);
                }
                return tasks;
            },

            save: function(tasks) {
                window.localStorage['tasks'] = angular.toJson(tasks);
            },

            newtask: function(taskTitle) {
                // Add a new task
                return {
                    title: taskTitle,
                    tasks: []
                };
            },

            getLastActiveIndex: function() {
                return parseInt(window.localStorage['lastTaskActiveTask']) || 0;
            },

            setLastActiveIndex: function(index) {
                window.localStorage['lastTaskActiveTask'] = index;
            }
        }
    }

    angular.module('todo')
           .factory('Tasks', TaskssFactory);

})();