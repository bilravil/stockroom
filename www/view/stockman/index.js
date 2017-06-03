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
            $scope.filter = { name: "", paging: { all: 0, current: 0, show: 10 },material : {}};
            $scope.form = {};
            $scope.Search = function () {
                $http.post('/Db/Record/Get', $scope.filter ).
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
            $scope.filter = { name: "", paging: { all: 0, current: 0, show: 10 },property: {}, stock:{} };
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

                if ($scope.select.id) {
                    $scope.view = "edit";
                }
            };
            $scope.$watch("filter.name", function (item) {
                $scope.Search();
            });
            $scope.Add = function () {
                $scope.view = "add";
                $scope.form.edit = function () { return { name: "", count :"", type:"",price:"",stockId:"",weight: "", density:"",diameter:"",length:"",sortament:"",in:"",out:""}; }();
                $scope.form.Cancel = function () { $scope.view = "edit"; };
                $scope.form.Add = function () {

                    $http.post('/Db/Material/Create',  $scope.form.edit ).
                    then(function (result) {
                        $scope.Search();
                        $scope.view = "edit";
                        return;
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
            $scope.filter = { number: "", paging: { all: 0, current: 0, show: 10 }};
            $scope.form = {};
            $scope.Search = function () {
                $http.post('/Db/Stock/Get', $scope.filter ).
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
            $scope.$watch("state", function (value) {

                if (value == undefined) return;
                $scope.filter.name=$scope.state.name ;
            });
            $scope.$watch("filter.number", function (item) {
                $scope.Search();
            });
            $scope.Add = function () {
                $scope.view = "add";
                $scope.form.edit = function () { return { number: "" }; }();
                $scope.form.Cancel = function () { $scope.view = "edit"; };
                $scope.form.Add = function () {

                    $http.post('/Db/Stock/Create', $scope.form.edit ).
                    then(function (result) {
                        $scope.Search();
                        $scope.view = "edit";
                   });
                };
                //
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
                $http.post('/Db/Record/Get', $scope.filter ).
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
        '<dx-field name="Кол-во" width-label="col-sm-2" width-value="col-sm-10" ><input type="number" class="form-control" ng-model="edit.count" /></dx-field>' +
        '<dx-field name="Марка" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.type" /></dx-field>' +
        '<dx-field name="Цена" width-label="col-sm-2" width-value="col-sm-10"><input type="number" class="form-control" ng-model="edit.price" /></dx-field>' +
        '<dx-field name="№ стеллажа" width-label="col-sm-2" width-value="col-sm-10"><dx-stock-list edit="edit"></dx-stock-list></dx-field>' +
        '</div>',
        link: function($scope) {
        }
    }
});

app.directive('dxPropertyEdit', function($timeout, $http) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            id: '=',
            select: '='
        },
        template: '<div class="form-horizontal" role="form">' +
        '<dx-field name="Вес" width-label="col-sm-2" width-value="col-sm-10"><input type="number" class="form-control" ng-model="edit.weight" /></dx-field>' +
        '<dx-field name="Плотность" width-label="col-sm-2" width-value="col-sm-10"><input type="number" class="form-control" ng-model="edit.density" /></dx-field>' +
        '<dx-field name="Диаметр" width-label="col-sm-2" width-value="col-sm-10" ><input type="number" class="form-control" ng-model="edit.diameter" /></dx-field>' +
        '<dx-field name="Длина" width-label="col-sm-2" width-value="col-sm-10"><input type="number" class="form-control" ng-model="edit.length" /></dx-field>' +
        '<dx-field name="Сортамент" width-label="col-sm-2" width-value="col-sm-10"><input type="number" class="form-control" ng-model="edit.sortament" /></dx-field>' +
        '<dx-field name="" width-label="col-sm-2" width-value="col-sm-10"><button class="btn btn-primary" ng-click="Add()">Сохранить</button></dx-field> '+
        '</div>',
        link: function($scope) {
            $scope.edit ={};
            $scope.$watch("select", function(value) {
                if (value == undefined) return;
                $scope.edit.weight = $scope.select["property.weight"];
                $scope.edit.density = $scope.select["property.density"];
                $scope.edit.diameter = $scope.select["property.diameter"];
                $scope.edit.length = $scope.select["property.length"];
                $scope.edit.sortament = $scope.select["property.sortament"];

            });       

            $scope.Add = function(){
                if($scope.id === undefined) return;
                $http.post('/Db/Property/Create',  $scope.edit ).
                then(function (result) {
                    $http.post('/Db/Material/Update',  {id:$scope.id,idProperty:result.data.id}).
                    then(function (result) {
                    })
                    
                });
            }



        }
    }
});

app.directive('dxRecordEdit', function($timeout, $http) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            select: '=',
            id: '='
        },
        template: '<div class="form-horizontal" role="form">' +
        '<dx-field name="Приход" width-label="col-sm-2" width-value="col-sm-10"><input type="number" class="form-control" ng-model="edit.in" /></dx-field>' +
        '<dx-field name="Расход" width-label="col-sm-2" width-value="col-sm-10"><input type="number" class="form-control" ng-model="edit.out" /></dx-field>' +
        '<dx-field name="" width-label="col-sm-2" width-value="col-sm-10"><button class="btn btn-primary" ng-click="Add()">Сохранить</button></dx-field>'+
        '</div>',
        link: function($scope) {

            $scope.edit ={};
            // $scope.$watch("select", function(value) {
            //     if (value == undefined) return;
            //     $scope.edit.in = $scope.select["stock.in"];
            //     $scope.edit.out = $scope.select["stock.out"];

            // });       

            $scope.Add = function(){
                if($scope.id === undefined) return;
                $scope.edit.idMaterial = $scope.id;
                $http.post('/Db/Record/Create',  $scope.edit ).
                then(function (result) { });
            }
        }
    }
});

app.directive('dxStackEdit', function($timeout, $http) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            edit: '=',
            visibilityUrl: "="
        },
        template: '<div class="form-horizontal" role="form">' +
        '<dx-field name="№ стеллажа" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.number" /></dx-field>' +
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

app.directive('dxStockList', function ($timeout, $http,$rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            edit: '=',
        },
        template:
        '<div style="display: inline-block;">'+
        '<select class="form-control" ng-model="edit.stockId" ng-options="item.id as item.number for item in stockId" style="margin-right:5px;"></select></div>',

        link: function ($scope, $element, $attrs) { 

            let filter = { number: "", paging: { all: 0, current: 0, show: 10 } };
            $http.post('/Db/Stock/Get', filter ).
                then(function (result) {
                    if (result.status != undefined && result.status == 200) {
                        $scope.stockId = result.data.rows;
                    }
                });
        }
    }
});