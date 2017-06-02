app.directive('dxMainStockman', function ($timeout, $http, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            state: "="
        },
        templateUrl: '/view/stockman/index.html',

        link: function ($scope, $element, $attrs) {
            $scope.active = 'record';
            $scope.Switch = function (active) {
                $timeout(function () { $scope.active = active; });
            };
        }
    }
});
app.directive('dxStockmanRecord', function ($timeout, $http, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            state:"="
        },
        templateUrl: '/view/stockman/record.html',
        link: function ($scope) {
            $scope.view = "edit";
            $scope.filter = { name: "", paging: { all: 0, current: 0, show: 10 },material : {}, task : {} };
            $scope.form = {};
            $scope.Search = function () {
                $http.post('/Db/StockTaking/Get', $scope.filter ).
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
                if ($scope.select.uuid) {
                    $scope.view = "edit";
                }
            };
            $scope.$watch("state", function (value) {

                if (value == undefined) return;
                $scope.filter.name=$scope.state.name ;
            });
            $scope.$watch("filter.name", function (item) {
                $scope.Search();
            });
            $scope.onClinicCreated = function (clinic) {
                $scope.items.splice(0, 0, clinic);
                $scope.filter.paging.all++;
            };
            $scope.Add = function () {
                $scope.form.edit = root.Clinic.Empty();
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

app.directive('dxStockmanMaterial', function ($timeout, $http, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            state:"="
        },
        templateUrl: '/view/stockman/material.html',
        link: function ($scope) {
            $scope.view = "edit";
            $scope.filter = { name: "", paging: { all: 0, current: 0, show: 10 } };
            $scope.form = {};
            $scope.Search = function () {
                $http.post('/Db/Material/Get', $scope.filter ).
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
                if ($scope.select.uuid) {
                    $scope.view = "edit";
                }
            };
            $scope.$watch("state", function (value) {

                if (value == undefined) return;
                $scope.filter.name=$scope.state.name ;
            });
            $scope.$watch("filter.name", function (item) {
                $scope.Search();
            });
            $scope.onClinicCreated = function (clinic) {
                $scope.items.splice(0, 0, clinic);
                $scope.filter.paging.all++;
            };
            $scope.Add = function () {
                $scope.form.edit = root.Clinic.Empty();
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

app.directive('dxStockmanStack', function ($timeout, $http, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            state:"="
        },
        templateUrl: '/view/stockman/stack.html',
        link: function ($scope) {
            $scope.view = "edit";
            $scope.filter = { name: "", paging: { all: 0, current: 0, show: 10 },material : {}, task : {} };
            $scope.form = {};
            $scope.Search = function () {
                $http.post('/Db/StockTaking/Get', $scope.filter ).
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
                if ($scope.select.uuid) {
                    $scope.view = "edit";
                }
            };
            $scope.$watch("state", function (value) {

                if (value == undefined) return;
                $scope.filter.name=$scope.state.name ;
            });
            $scope.$watch("filter.name", function (item) {
                $scope.Search();
            });
            $scope.onClinicCreated = function (clinic) {
                $scope.items.splice(0, 0, clinic);
                $scope.filter.paging.all++;
            };
            $scope.Add = function () {
                $scope.form.edit = root.Clinic.Empty();
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

app.directive('dxStockmanDetail', function ($timeout, $http, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            state:"="
        },
        templateUrl: '/view/stockman/detail.html',
        link: function ($scope) {
            $scope.view = "edit";
            $scope.filter = { name: "", paging: { all: 0, current: 0, show: 10 },material : {}, task : {} };
            $scope.form = {};
            $scope.Search = function () {
                $http.post('/Db/StockTaking/Get', $scope.filter ).
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
                if ($scope.select.uuid) {
                    $scope.view = "edit";
                }
            };
            $scope.$watch("state", function (value) {

                if (value == undefined) return;
                $scope.filter.name=$scope.state.name ;
            });
            $scope.$watch("filter.name", function (item) {
                $scope.Search();
            });
            $scope.onClinicCreated = function (clinic) {
                $scope.items.splice(0, 0, clinic);
                $scope.filter.paging.all++;
            };
            $scope.Add = function () {
                $scope.form.edit = root.Clinic.Empty();
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

app.directive('dxMaterialEdit', function($timeout, $http) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            edit: '=',
            visibilityUrl: "="
        },
        template: '<div class="form-horizontal" role="form">' +
            '<dx-field name="Наименование" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.name" /></dx-field>' +
            '<dx-field name="Кол-во" width-label="col-sm-2" width-value="col-sm-10" ><input type="text" class="form-control" ng-model="edit.count" /></dx-field>' +
            '<dx-field name="Марка" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.type" /></dx-field>' +
            '<dx-field name="Цена" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.price" /></dx-field>' +
            '<dx-field name="№ стеллажа" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.stack" /></dx-field>' +
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
app.directive('dxPropertyEdit', function($timeout, $http) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            edit: '=',
            visibilityUrl: "="
        },
        template: '<div class="form-horizontal" role="form">' +
            '<dx-field name="Вес" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.weight" /></dx-field>' +
            '<dx-field name="Плотность" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.density" /></dx-field>' +
            '<dx-field name="Диаметр" width-label="col-sm-2" width-value="col-sm-10" ><input type="text" class="form-control" ng-model="edit.diameter" /></dx-field>' +
            '<dx-field name="Длина" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.length" /></dx-field>' +
             '<dx-field name="Сортамент" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.sortament" /></dx-field>' +
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

app.directive('dxScoreEdit', function($timeout, $http) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            edit: '=',
            visibilityUrl: "="
        },
        template: '<div class="form-horizontal" role="form">' +
            '<dx-field name="Номер задачи" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.number" /></dx-field>' +
            '<dx-field name="Наименование работ" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.name" /></dx-field>' +
            '<dx-field name="Кол-во деталей" width-label="col-sm-2" width-value="col-sm-10" ><input type="text" class="form-control" ng-model="edit.detailCount" /></dx-field>' +
            '<dx-field name="Начало задачи" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.startDate" /></dx-field>' +
            '<dx-field name="Завершение" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.endDate" /></dx-field>' +
            '<dx-field name="Затраченное время в пред. месяце" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.prevTime" /></dx-field>' +
            '<dx-field name="Общее затраченное время"  width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.totalTime" /></dx-field>'+
            '<dx-field name="з/п за пред. месяцы"  width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.prevSalary" /></dx-field>'+
            '<dx-field name="з/п" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.curSalary" /></dx-field>' +
            '<dx-field name="Статус" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.number" /></textarea></dx-field>' +
            '<dx-field name="з/п рабочим(за дет.)" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.detailSalary" /></dx-field>' +
            '<dx-field name="Стоимость материала и комплектующих" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.materialCostPrise" /></dx-field>' +
            '<dx-field name="Себестоимось" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.costPrice" /></dx-field>' +
            '<dx-field name="" width-label="col-sm-2" width-value="col-sm-10" ng-if="error"><div class="alert alert-danger" role="alert">{{error}}</div></dx-field>' +
            '<dx-field name="" width-label="col-sm-2" width-value="col-sm-10" ng-show="error"><strong style="color:red">{{error}}</strong></dx-field>' +
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