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
            $scope.filter = { name: "", paging: { all: 0, current: 0, show: 10 }, material : {} };
            $scope.Search = function () {
                $http.post('/Db/Task/Get', $scope.filter ).
                then(function (result) {
                    if (result.status != undefined && result.status == 200) {
                        $scope.items = result.data.rows;
                        console.log($scope.items);
                    }
                });
            };

            $scope.OpenFile = function (url) {
                url = url.replace(/\\/g, '/');
                console.log(url);
                window.location = "file:///"+url;
                
            };

            $scope.EditTask = function (item) {
                $rootScope.modalDialog({ 
                    edit: item, 
                    template: "<dx-edit-task></dx-edit-task>" }, function (data) {
                        if(data === undefined) return; 
                        let req = {idTask : data.id, idWorker : data.idWorker};                       
                        $http.post('/Db/Work/Create',  req).
                        then(function (result) { });
                        req = {id : data.id, status: data.status}
                        $http.post('/Db/Task/Update',  req).
                        then(function (result) { });
                });
                
            };

            $scope.Search();
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
                    }
                });
            };
            $scope.Paging = function (current) {
                $scope.Search();
            };
            $scope.Select = function (item) {
                $scope.select = item;
                if ($scope.select.id) {
                    $scope.view = "edit";
                }
            };
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

                $scope.form.edit = function () { return { first: "", middle: "", last: "", persNum: "" , speciality : ""}; }();
                $scope.view = "add";
                $scope.form.Cancel = function () { $scope.view = "edit"; };
                $scope.form.Add = function () {
                    $http.post('/Db/Worker/Create', $scope.form.edit  ).
                    then(function (result,status) {
                        $scope.Search();
                        $scope.view = "edit";
                        return;
                    },function(err){console.log(err)})
                    
                };
                
            }
        }
    }
});

app.directive('dxWorkerEdit', function($timeout, $http) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            edit: '='
        },
        template: '<div class="form-horizontal" role="form">' +
        '<dx-field name="Фамилия" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.first" /></dx-field>' +
        '<dx-field name="Имя" width-label="col-sm-2" width-value="col-sm-10" ><input type="text" class="form-control" ng-model="edit.middle" /></dx-field>' +
        '<dx-field name="Отчество" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.last" /></dx-field>' +
        '<dx-field name="Табельный номер" width-label="col-sm-2" width-value="col-sm-10"><input type="number" class="form-control" ng-model="edit.persNum" /></dx-field>' +
        '<dx-field name="Специальность" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.speciality" /></dx-field>' +
        '</div>',
        link: function($scope) {
        }
    }
});

app.directive('dxEditTask', function ($timeout, $http, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {

        },
        templateUrl:"view/brigadier/edittask.html",

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

app.directive('dxWorkerList', function ($timeout, $http,$rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            edit: '='
        },
        template:
        '<div style="display: inline-block;">'+
        '<select class="form-control" ng-model="edit.idWorker" placeholder="Рабочий" ng-options="item.id as item.first for item in idWorker" style="margin-right:5px;"></select></div>',

        link: function ($scope, $element, $attrs) { 
            let filter = { name: "", paging: { all: 0, current: 0, show: 10 } };
            $http.post('/Db/Worker/Get', filter ).
                then(function (result) {
                    if (result.status != undefined && result.status == 200) {
                        $scope.idWorker = result.data.rows;
                       // $scope.filter.materialId = $scope.division[0].uuid;
                    }
                });
        }
    }
});