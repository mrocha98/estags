angular.module('alurapic').controller('FotosController', function ($scope, $resource) {
  $scope.fotos = []
  $scope.filtro = ''
  $scope.mensagem = ''

  const recursoFoto = $resource('v1/fotos/:fotoId')

  recursoFoto.query(
    (fotos) => {
      $scope.fotos = fotos
    },
    (error) => {
      console.log(error)
    }
  )

  $scope.remover = (foto) =>
    recursoFoto.delete(
      { fotoId: foto._id },
      () => {
        const indiceFoto = $scope.fotos.indexOf(foto)
        $scope.fotos.splice(indiceFoto, 1)
        $scope.mensagem = `Foto ${foto.titulo} foi removida com sucesso`
      },
      (error) => {
        console.log(error)
        $scope.mensagem = `Não foi possível remover a foto ${foto.titulo}`
      }
    )
})
