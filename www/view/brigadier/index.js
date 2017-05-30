app.directive('dxMainBrigadier', function ($timeout, $http, $rootScope) {
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