(function () {

    function ProjectsFactory() {
        return {
            all: function () {
                var projectString = window.localStorage['projects'];
                if (projectString) {
                    return angular.fromJson(projectString);
                }
                return [];
            },

            getActiveProject: function () {
                var p = this.all[this.getLastActiveIndex()];
                if(!p){
                    var newP = this.newProject();
                    
                    p = this.newProject()
                }
                return p;
            },

            save: function (projects) {
                window.localStorage['projects'] = angular.toJson(projects);
            },

            newProject: function (projectTitle) {
                // Add a new project
                return {
                    title: projectTitle,
                    tasks: []
                };
            },
            
            getLastActiveIndex: function () {
                return parseInt(window.localStorage['lastActiveProject']) || 0;
            },

            setLastActiveIndex: function (index) {
                window.localStorage['lastActiveProject'] = index;
            }
        }
    }

    angular.module('todo')
        .factory('Projects', ProjectsFactory);

})();