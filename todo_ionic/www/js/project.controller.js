(function () {

    function ProjectsControler(){

        // A utility function for creating a new project
        // with the given projectTitle
        var createProject = function (projectTitle) {
            var newProject = Projects.newProject(projectTitle);
            $scope.projects.push(newProject);
            Projects.save($scope.projects);
            $scope.selectProject(newProject, $scope.projects.length - 1);
        }

        // Load or initialize projects
        $scope.projects = Projects.all();
        
        
        // Grab the last active, or the first project
       $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

        // Called to create a new project
        $scope.newProject = function () {
            var projectTitle = prompt('Project name');
            if (projectTitle) {
                createProject(projectTitle);
            }
        };

        // Called to select the given project
        $scope.selectProject = function (project, index) {
            $scope.activeProject = project;
            Projects.setLastActiveIndex(index);
            $ionicSideMenuDelegate.toggleLeft(false);
        };

    }

    angular.module('todo')
        .controller('ProjectsCtrl', TodoController)

})();