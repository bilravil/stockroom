app.directive('dxMainAdmin', function ($timeout, $http, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            state: "="
        },
        templateUrl: '/view/admin/index.html',

        link: function ($scope, $element, $attrs) {
            $scope.active = 'task';
            $scope.Switch = function (active) {
                $timeout(function () { $scope.active = active; });
            };
            $scope.$watch("state", function (value) {
                if ($scope.state == undefined) return;
                $timeout(function () {
                    $scope.state.task = $scope.state.task || {};         
                });
            });
        }
    }
});

app.directive('dxAdminTask', function ($timeout, $http, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            state:"="
        },
        templateUrl: '/view/admin/task.html',
        link: function ($scope) {
            $scope.view = "edit";
            $scope.filter = { name: "", paging: { all: 0, current: 0, show: 10 } };
            $scope.form = {};
            $scope.Search = function () {
                $http.post('/Db/Task/Get', $scope.filter ).
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
                $scope.form.edit = function(){ return {number:"",name:"",detailCount:"",materialCostPrice:"",startDate:"",endDate:"",status:"",salary:""} }();
                $scope.view = "add";
                $scope.form.Cancel = function () { $scope.view = "edit"; };
                $scope.form.Add = function () {

                    // $http.post('/Db/Task/Create', request ).
                    // then(function (result,status) {
                        
                    // },
                    // function(error){
                    //     console.log(error);
                    // })
                    
                };
                $scope.view = "edit";
            }
        }
    }
});

app.directive('dxTaskEdit', function($timeout, $http) {
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
        '<dx-field name="Начало задачи" width-label="col-sm-2" width-value="col-sm-10"><input type="date" class="form-control" ng-model="edit.startDate" /></dx-field>' +
        '<dx-field name="Завершение" width-label="col-sm-2" width-value="col-sm-10"><input type="date" class="form-control" ng-model="edit.endDate" /></dx-field>' +
        '<dx-field name="Общее затраченное время"  width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.totalTime" /></dx-field>'+
        '<dx-field name="з/п за пред. месяцы"  width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.salary" /></dx-field>'+
        '<dx-field name="з/п" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.curSalary" /></dx-field>' +
        '<dx-field name="Статус" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.status" /></textarea></dx-field>' +
        '<dx-field name="з/п рабочим(за дет.)" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.detailSalary" /></dx-field>' +
        '<dx-field name="Стоимость материала и комплектующих" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.materialCostPrise" /></dx-field>' +
        '<dx-field name="Себестоимось" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.costPrice" /></dx-field>' +
        '<dx-field name="Материал" width-label="col-sm-2" width-value="col-sm-10"><dx-material-list></dx-material-list></dx-field>' +
        '<dx-field name="Загрузить чертеж" width-label="col-sm-2" width-value="col-sm-10"><input id="sex" type="file" multiple="true" onchange="onFileSelect()"/><br /></dx-field>'+

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

            onFileSelect = function() {
                var c = document.getElementById('sex');
                var files = c.files;
                if (files.length > 0){
                    var formData = new FormData();

                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];

                        formData.append('data', file, file.name);
                    }

                    $.ajax({
                        url: '/upload',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(data){
                            console.log(data.path);
                            
                        },
                    });

                }
            }

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

app.directive('dxMaterialList', function ($timeout, $http,$rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            filter: '=',
            onFilter: "&",
            flag : '='
        },
        template:
        '<div style="display: inline-block;">'+
        '<select class="form-control" ng-model="filter.materialId" placeholder="Материал" ng-options="item.id as item.name for item in material" style="margin-right:5px;"></select></div>',

        link: function ($scope, $element, $attrs) { 
            let filter = { name: "", paging: { all: 0, current: 0, show: 10 } };
            $http.post('/Db/Material/Get', filter ).
                then(function (result) {
                    if (result.status != undefined && result.status == 200) {
                        result.data.rows.unshift({uuid:0,name:"Материал"}); 
                        $scope.materialId = result.data.rows;
                       // $scope.filter.materialId = $scope.division[0].uuid;
                    }
                });
            $scope.$watch("[filter.materialId]", function (value) {
                if($scope.flag === true && value[0] == 0){ 
                    $scope.flag = false;               
                    return;
                }    
                                               
                if ($scope.filter == undefined) return;
                if (value[0] == undefined) {
                    return;
                }
                
               
            });
        }
    }
});
