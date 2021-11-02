

angular.module("tk", [])
      .controller("tkController", ["$scope", "$http", function($scope, $http) {

        $scope.guardar1 = function() {

          $http.post("./datausr.php", angular.toJson($scope.access))
            .then(function(respuesta) {

              $datos = respuesta.data;

              if ($datos[0]['cvezone'] >0)
              {
                window.location.href = "index2.html?id="+$datos[0]['hash_'] ;
              }
              else
              {
                bootbox.alert("usuario invalido o password incorrecto...!");

              }

            });

        };


      }]);
