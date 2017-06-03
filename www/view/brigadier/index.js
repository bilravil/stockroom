app.directive('dxMainBrigadier', function ($timeout, $http, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            state: "="
        },
        templateUrl: '/view/brigadier/index.html',

        link: function ($scope, $element, $attrs) {
            $scope.active = "task";
            $scope.Switch = function (active) {
                $timeout(function () { $scope.active = active; });
            };
        }
    }
});

app.directive('dxBrigadierTask', function ($timeout, $http, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            state: "="
        },
        templateUrl: '/view/brigadier/task.html',

        link: function ($scope, $element, $attrs) {

            $scope.Switch = function (active) {
                $timeout(function () { $scope.active = active; });
            };

            $scope.NewTask = function(){
                $rootScope.modalDialog({ 
                    edit: {}, 
                    template: "<dx-create-new-task></dx-create-new-task>" }, function (data) {
                        if(data === undefined) return; 
                        
                        //$scope.Search();
                    });
            }
        }
    }
});

app.directive('dxBrigadierWorker', function ($timeout, $http, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            state:"="
        },
        templateUrl: '/view/brigadier/worker.html',
        link: function ($scope) {
            $scope.view = "edit";
            $scope.filter = { name: "", paging: { all: 0, current: 0, show: 10 }, material : {}, task : {} };
            $scope.form = {};
            $scope.Search = function () {
                $http.post('/Db/Worker/Get', $scope.filter ).
                then(function (result) {
                    if (result.status != undefined && result.status == 200) {
                        $scope.items = result.data.rows;
                        console.log($scope.items)
                    }
                });
            };
            $scope.Paging = function (current) {
                $scope.Search();
            };
            $scope.Select = function (item) {
                $scope.select = item;
                if ($scope.select.uuid) {
                    $scope.view = "edit";
                }
            };
            $scope.$watch("state", function (value) {

                if (value == undefined) return;
                $scope.filter.name=$scope.state.name ;
            });
            $scope.$watch("filter.name", function (value) {
                delete $scope.filter.first; delete $scope.filter.middle; delete $scope.filter.last;
                if (value == undefined ) { return $scope.Search(); }
                var s = value.split(" ");
                if (s.length == 1) { $scope.filter.first = s[0]; $scope.filter.middle = ""; $scope.filter.last = ""; }
                if (s.length == 2) { $scope.filter.first = s[0]; $scope.filter.middle = s[1]; $scope.filter.last = ""; }
                if (s.length == 3) { $scope.filter.first = s[0]; $scope.filter.middle = s[1]; $scope.filter.last = s[2]; }
                $scope.Search();
            });
            $scope.Add = function () {

                $scope.view = "add";
                $scope.form.Cancel = function () { $scope.view = "edit"; };
                $scope.form.Add = function () {

                    console.log($scope);
                };
                $scope.view = "add";
            }
        }
    }
});

app.directive('dxWorkerEdit', function($timeout, $http) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            edit: '=',
            visibilityUrl: "="
        },
        template: '<div class="form-horizontal" role="form">' +
        '<dx-field name="Фамилия" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.first" /></dx-field>' +
        '<dx-field name="Имя" width-label="col-sm-2" width-value="col-sm-10" ><input type="text" class="form-control" ng-model="edit.middle" /></dx-field>' +
        '<dx-field name="Отчество" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.last" /></dx-field>' +
        '<dx-field name="Табельный номер" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.persNum" /></dx-field>' +
        '<dx-field name="Специальность" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.speciality" /></dx-field>' +
        '</div>',
        link: function($scope) {

            var prev = "";
            $scope.$watch("edit", function(value) {
                if (value == undefined) return;
                $timeout(function () {
                    $scope.edit.first = $scope.edit.first || {};
                    console.log($scope.edit.first);
                    if (value) prev = JSON.stringify($scope.edit);
                    else prev = "";
                }, 1000)

            });

            function Save() {
                delete $scope.error;
            }
            var timerId = setInterval(function() { if ($scope.edit && $scope.edit.uuid && prev.length > 0 && prev != JSON.stringify($scope.edit)) Save();}, 500);
            $scope.$on('$destroy', function() {
                clearInterval(timerId);
            });



        }
    }
});

app.directive('dxCreateNewTask', function ($timeout, $http, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {

        },
        templateUrl:"view/brigadier/newtask.html",

        link: function ($scope, $element) {
            $scope.edit = $scope.$parent.param.edit;
            $scope.Close = function () {
                $scope.$parent.close();
            }  

            $scope.Add = function(){
                console.log($scope.edit);
                $scope.$parent.close();
            }  
        }
    }
});