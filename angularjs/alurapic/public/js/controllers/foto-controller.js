angular.module('alurapic').controller('FotoController', function ($scope, $http, $routeParams, $resource) {
  $scope.foto = {}
  $scope.mensagem = ''

  const recursoFoto = $resource('v1/fotos/:fotoId', null, {
    update: {
      method: 'PUT'
    }
  })

  if ($routeParams.fotoId) {
    $http
      .get(`v1/fotos/${$routeParams.fotoId}`)
      .success((foto) => ($scope.foto = foto))
      .error((error) => {
        $scope.mensagem = 'Não foi possível obter a foto'
        console.log(error)
      })
  }

  $scope.submeter = () => {
    if ($scope.formulario.$valid) {
      if ($scope.foto._id) {
        recursoFoto.update(
          { fotoId: $scope.foto._id },
          $scope.foto,
          () => ($scope.mensagem = `A foto ${$scope.foto.titulo} foi alterada com sucesso`),
          (erro) => {
            console.log(error)
            $scope.mensagem = 'Não foi possível editar a foto'
          }
        )
      } else {
        $http
          .post('v1/fotos', $scope.foto)
          .success(() => {
            $scope.foto = {}
            $scope.mensagem = 'Foto cadastrada com sucesso'
          })
          .error((error) => {
            console.log(error)
            $scope.mensagem = 'Não foi possível incluir a foto'
          })
      }
    }
  }
})
