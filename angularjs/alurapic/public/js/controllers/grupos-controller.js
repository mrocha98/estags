angular.module('alurapic').controller('GruposController', function ($scope, $http) {
  $scope.grupos = []

  $http
    .get('v1/grupos')
    .success((grupos) => ($scope.grupos = grupos))
    .error((error) => console.log(error))
})
