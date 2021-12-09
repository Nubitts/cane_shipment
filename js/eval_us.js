/* eslint-disable indent */
/* eslint-disable unicorn/prefer-ternary */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-var */
/* eslint-disable space-infix-ops */
/* eslint-disable dot-notation */
/* eslint-disable brace-style */
/* eslint-disable prefer-template */
/* eslint-disable semi-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable quotes */
/* eslint-disable semi */


angular.module("tk", [])
      .controller("tkController", ["$scope", "$http", function($scope, $http) {

        $scope.guardar1 = function() {

          $http.post("./datausr.php", angular.toJson($scope.access))
            .then(function(respuesta) {

              $datos = respuesta.data;

              var scve = $datos[0]['cve'];
              var sfijo = $datos[0]['tu'];

              if (scve != "0")
              {
                if (sfijo != "B")
                {
                  window.location.href = "index2.html?id="+$datos[0]['hash_'] ;
                }
                else
                {
                  window.location.href = "indexb.html?id="+$datos[0]['hash_'] ;
                  }
                
              }
              else
              {
                bootbox.alert("usuario invalido o password incorrecto...!");
              }

            });

        };


      }]);
