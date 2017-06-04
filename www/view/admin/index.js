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
                if ($scope.select.id) {
                     
                    $scope.view = "edit";
                }
            };
            $scope.$watch("filter.name", function (item) {
                $scope.Search();
            });
            $scope.Add = function () {
                $scope.form.edit = function(){ return {number:"",name:"",detailCount:0,totalTime:0,materialCostPrice:0,startDate:"",endDate:"",status:"",salary:0,idMaterial:"", file:""} }();
                $scope.view = "add";
                $scope.form.Cancel = function () { $scope.view = "edit"; };
                $scope.form.Add = function () {
                    $http.post('/Db/Task/Create', $scope.form.edit ).
                    then(function (result,status) {
                        $scope.Search();
                        $scope.view = "edit";
                    },
                    function(error){
                        console.log(error);
                    })
                    $scope.view = "add";
                };
                
            }

            
        }
    }
});

app.directive('dxTaskEdit', function($timeout, $http) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            edit: '='
        },
        template: '<div class="form-horizontal" role="form">' +
        '<dx-field name="Номер задачи" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.number" /></dx-field>' +
        '<dx-field name="Наименование работ" width-label="col-sm-2" width-value="col-sm-10"><input type="text" class="form-control" ng-model="edit.name" /></dx-field>' +
        '<dx-field name="Кол-во деталей" width-label="col-sm-2" width-value="col-sm-10" ><input type="number" class="form-control" ng-model="edit.detailCount" /></dx-field>' +
        '<dx-field name="Начало задачи" width-label="col-sm-2" width-value="col-sm-4"><input type="date" class="form-control" ng-model="edit.startDate" /></dx-field>' +
        '<dx-field name="Завершение" width-label="col-sm-2" width-value="col-sm-4"><input type="date" class="form-control" ng-model="edit.endDate" /></dx-field>' +
        '<dx-field name="Общее затраченное время"  width-label="col-sm-2" width-value="col-sm-10"><input type="number" class="form-control" ng-model="edit.totalTime" /></dx-field>'+
        '<dx-field name="з/п за пред. месяцы"  width-label="col-sm-2" width-value="col-sm-10"><input type="number" class="form-control" ng-model="edit.salary" /></dx-field>'+
        '<dx-field name="з/п" width-label="col-sm-2" width-value="col-sm-10"><input type="number" class="form-control" ng-model="edit.curSalary" /></dx-field>' +
        '<dx-field name="Статус" width-label="col-sm-2" width-value="col-sm-10"><dx-status edit="edit"></dx-status></dx-field>' +
        '<dx-field name="з/п рабочим(за дет.)" width-label="col-sm-2" width-value="col-sm-10"><input type="number" class="form-control" ng-model="edit.detailSalary" /></dx-field>' +
        '<dx-field name="Стоимость материала и комплектующих" width-label="col-sm-2" width-value="col-sm-10"><input type="number" class="form-control" ng-model="edit.materialCostPrice" /></dx-field>' +
        '<dx-field name="Себестоимось" width-label="col-sm-2" width-value="col-sm-10"><input type="number" class="form-control" ng-model="edit.costPrice" /></dx-field>' +
        '<dx-field name="Материал" width-label="col-sm-2" width-value="col-sm-10"><dx-material-list edit="edit"></dx-material-list></dx-field>' +
        '<dx-field name="Загрузить чертеж" width-label="col-sm-2" width-value="col-sm-10"><dx-upload-file edit="edit"></dx-upload-file></dx-field>'+

        '</div>',
        link: function($scope) {

            //  $scope.$watch("[edit]", function (value) {
            //     $scope.edit.startDate = new Date($scope.edit.startDate);
            //     $scope.edit.endDate = new Date($scope.edit.endDate);
            // });

        }
    }
});

app.directive('dxMaterialList', function ($timeout, $http,$rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            edit: '='
        },
        template:
        '<div style="display: inline-block;">'+
        '<select class="form-control" ng-model="edit.idMaterial" placeholder="Материал" ng-options="item.id as item.name for item in idMaterial" style="margin-right:5px;"></select></div>',

        link: function ($scope, $element, $attrs) { 
            let filter = { name: "", paging: { all: 0, current: 0, show: 10 } };
            $http.post('/Db/Material/Get', filter ).
                then(function (result) {
                    if (result.status != undefined && result.status == 200) {
                        result.data.rows.unshift({uuid:0,name:"Материал"}); 
                        $scope.idMaterial = result.data.rows;
                       // $scope.filter.materialId = $scope.division[0].uuid;
                    }
                });
        }
    }
});

app.directive('dxStatus', function ($timeout, $http) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            edit: '=',
        },
        template:
        '<div style="display: inline-block;">'+
        '<select class="form-control" ng-model="edit.status" placeholder="Статус" ng-options="item.id as item.name for item in status" style="margin-right:5px;"  ></select>' +
        '</div>',

        link: function ($scope, $element, $attrs) {
            $scope.status = [{ id: 'registered', name: "Назначено" },
                            { id: 'finished', name: "Завершено" }];
            
        }
    }
});

app.directive('dxUploadFile', function ($timeout, $http) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            edit: '=',
        },
        template:
        `<div>
            <form class="form" ng-submit="doUpload()">            
                    <file-field class="btn btn-primary" ng-model="uploadFile" ng-class="{'btn-success':uploadFile}" preview="previewImage">Выбрать файл</file-field>              
                <button class="btn btn-primary">Загрузить</button>
            </form>
        </div>`,

        link: function ($scope, $element, $attrs) {


            $scope.doUpload = function(){
                var formData = new FormData();
                formData.append('data', $scope.uploadFile,$scope.title);

                $.ajax({
                    url: '/upload',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(data){
                        $scope.edit.file = data.path;
                        
                    },
                    error: function (error) {
                          console.log(error)
                    } 
                });
            }
        }
    }
});
