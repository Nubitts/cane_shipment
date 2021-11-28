/* eslint-disable unicorn/prefer-ternary */
/* eslint-disable quotes */
/* eslint-disable no-var */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-lonely-if */
/* eslint-disable no-empty */
/* eslint-disable unicorn/empty-brace-spaces */
/* eslint-disable brace-style */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable no-alert */
/* eslint-disable camelcase */
/* eslint-disable default-case */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable padded-blocks */
angular.module('gn', [])
      .controller('gnController', ['$scope', '$http', function ($scope, $http) {

        $scope.init = function () {

          const valores = window.location.search

          const sId = valores.slice(4, 84)

          $scope.gn1.hash_ = sId

            $http.post('../../datusr.php', angular.toJson($scope.gn1))
            .then(respuesta => {

              $datos = respuesta.data

              if ($datos[0].cvezone != ' ') {

                $scope.gn1.zone = $datos[0].cve
                $scope.gn1.user = $datos[0].user_
                $scope.gn1.typeu = $datos[0].tu
                $scope.gn1.id = $datos[0].id

              } else {
                bootbox.alert('usuario invalido o password incorrecto...!')
              }

            })

        }

        $scope.load1 = function () {

          const valores = window.location.search

          const sId = valores.slice(4, 84)

          $scope.gn1.hash_ = sId

          window.location.href = `../../index2.html?id=${$scope.gn1.hash_}`

        }

        $scope.save = function () {

          bootbox.confirm('Confirma Concretar datos de quema a los tickets?', result => {

            if (result == true) {

              let baneje = 0

              if (typeof ($scope.gn1.datinitial) == 'undefined' || $scope.gn1.datinitial.trim().lenght == 0) {
                baneje = 1
              }

              if (typeof ($scope.gn1.horinitial) == 'undefined') {
                baneje = 1
              }

              if (typeof ($scope.gn1.order) == 'undefined') {
                baneje = 1
              }

              if (typeof ($scope.gn1.tickinitial) == 'undefined') {
                baneje = 1
              }

              if (typeof ($scope.gn1.tickend) == 'undefined') {
                baneje = 1
              }

              if (baneje == 0) {

                $scope.gn1.typecane = $scope.gn1.typecanes[0];

                if (typeof ($scope.gn1.typeburns) == 'undefined') {
                  $scope.gn1.typeburn = "";
                }
                else
                {
                  $scope.gn1.typeburn = $scope.gn1.typeburns[0];
                }

                 $http.post('../../saveburn.php', angular.toJson($scope.gn1))
                          .then(respuesta => {

                            $Resulta = respuesta.data

                            bootbox.alert(`${$Resulta[0].resultado}!`, () => {
                              cleanforms();
                            })

                          })

              }

              if (baneje == 1) {
                bootbox.alert({
                  message: 'No es posible asignar Tiempo de quema, algun campo vacio!',
                  size: 'small'
                })

              }

            }

          })

        }

        $scope.load2 = function () {

          window.location.href = "../../index.html";

        };

        $scope.cleanforms = function () {
          $("#formburn")[0].reset();
        }

      }])

function is_numeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
}
