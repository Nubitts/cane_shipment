/* eslint-disable space-before-blocks */
/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable no-alert */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable dot-notation */
/* eslint-disable brace-style */
/* eslint-disable no-var */
/* eslint-disable semi */
/* eslint-disable comma-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable unicorn/prefer-string-slice */
/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable quotes */

    angular.module("hr", [])
      .controller("hrController", ["$scope", "$http", function($scope, $http) {


        $scope.init = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          $http.post("./datusr.php", angular.toJson($scope.hr1))
            .then(function(respuesta) {

              $datos = respuesta.data;

              if ($datos[0]['cve'] != " ")
              {

                $scope.hr1.zone = $datos[0]['cve'];
                $scope.hr1.user = $datos[0]['user_'];
                $scope.hr1.typeu = $datos[0]['tu'];
                $scope.hr1.id = $datos[0]['id'];

                $http.post("./table.php", angular.toJson($scope.hr1))
                  .then(function(respuesta) {

                    $scope.hr1.datas = respuesta.data;

                  });
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

        $scope.load2 = function() {

          window.location.href = "index.html";

        };

        $scope.load3 = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          window.location.href = "./pages/forms/ordquema.html?id=" + $scope.hr1.hash_;

        };

        $scope.cleaned = function() {

          alert($("#quita").value);

              bootbox.confirm("Esta seguro de anular la asignacion al ticket " + ticket + "!", function(result){
                  console.log('This was logged in the callback: ' + result);
              });

        };


      }]);

