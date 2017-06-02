app.directive('dxBrigadierTask', function ($timeout, $http, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            state: "="
        },
        templateUrl: '/view/brigadier/index.html',

        link: function ($scope, $element, $attrs) {
            $scope.Switch = function (active) {
                $timeout(function () { $scope.active = active; });
            };
        }
    }
});
<<<<<<< HEAD

=======
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

                    root.Clinic.Put({
                        $http: $http, data: $scope.form.edit,
                        success: function (result) {
                            $scope.items.splice(0, 0, result);
                            $scope.Select(result);
                            $scope.filter.paging.all++;
                        },
                        error: function (result) { }
                    });
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
                //$timeout(function () {
                $scope.edit.additional = $scope.edit.additional || {};
                $scope.edit.additional.phones = $scope.edit.additional.phones || [{ type: "main" }];
                $scope.edit.additional.addresses = $scope.edit.additional.addresses || [{ type: "main" }];
                $scope.edit.organization = $scope.edit.organization || { lid: 0, children: [] };
                $scope.edit.additional.population = $scope.edit.additional.population || "";
                $scope.edit.additional.devices = $scope.edit.additional.devices || [{type:"ECG"}];
                if (value) prev = JSON.stringify($scope.edit);
                else prev = "";
                //}, 1000)

            });

            function Save() {
                delete $scope.error;
                root.Clinic.Put({
                    $http: $http,
                    data: $scope.edit,
                    success: function(result) { if (!$scope.edit.uuid) $scope.edit.uuid = result.uuid;
                        prev = JSON.stringify($scope.edit); },
                    error: function(result) {
                        prev = JSON.stringify($scope.edit);
                        $scope.error = result.message;
                    }
                });
            }
            var timerId = setInterval(function() { if ($scope.edit && $scope.edit.uuid && prev.length > 0 && prev != JSON.stringify($scope.edit)) Save();}, 500);
            $scope.$on('$destroy', function() {
                clearInterval(timerId);
            });



        }
    }
});
>>>>>>> 82b279f1790ec00c9af30c84c267db3b63083a90
