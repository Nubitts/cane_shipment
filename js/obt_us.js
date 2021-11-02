
    angular.module("hr", [])
      .controller("hrController", ["$scope", "$http", function($scope, $http) {


        $scope.init = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          $http.post("./datusr.php", angular.toJson($scope.hr1))
            .then(function(respuesta) {

              $datos = respuesta.data;

              if ($datos[0]['cvezone'] >0)
              {

                $scope.hr1.zone = $datos[0]['cvezone'];
                $scope.hr1.user = $datos[0]['description'];

              }
              else
              {
                bootbox.alert("usuario invalido o password incorrecto...!");

              }

            });


        };

         $scope.load1 = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          window.location.href = "./pages/forms/general.html?id=" + $scope.hr1.hash_;

         };


      }]);

