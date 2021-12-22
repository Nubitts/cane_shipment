/* eslint-disable comma-spacing */
/* eslint-disable unicorn/prefer-spread */
/* eslint-disable unicorn/prefer-string-slice */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-template */
/* eslint-disable space-before-blocks */
/* eslint-disable spaced-comment */
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

            $http.post('../../listzones.php', angular.toJson($scope.gn1))
            .then(respuesta => {

              $datazones = respuesta.data

              datc = [];

              for (element in $datazones) {
                  datc.push($datazones[element].cvezone)
              }

              $scope.gn1.datazones = datc;

            })

        }

        $scope.ordrld = function () {

            $http.post('../../listorders.php', angular.toJson($scope.gn1))
            .then(respuesta => {

              $aorders = respuesta.data;

              datcc = [];

              for (element in $aorders) {
                datcc.push($aorders[element].orden);
              }

              $scope.gn1.listo = datcc;

            })

        }

        $scope.save = function () {

          bootbox.confirm('Confirma Concretar habilitar ordenes para asignacion?', result => {

            if (result == true) {

              let baneje = 0

              if (typeof ($scope.gn1.idzone) == 'undefined') {
                baneje = 1
              }

              if (typeof ($scope.gn1.ordl) == 'undefined') {
                baneje = 1
              }

              if (baneje == 0) {

                var $acumor = "";

                for (element in $scope.gn1.ordl) {
                  $acumor = $acumor.concat($scope.gn1.ordl[element], ",");
                  //datcc.push($aorders[element].orden);
                }

                const str2 = $acumor.substring(0, $acumor.length - 1);

                $scope.gn1.listord = str2;

                 $http.post('../../saveorders.php', angular.toJson($scope.gn1))
                          .then(respuesta => {

                            $Resulta = respuesta.data

                            bootbox.alert(`${$Resulta[0].resultado}!`, () => {
                              $("#formord")[0].reset();
                            })

                          })

              }

              if (baneje == 1) {
                bootbox.alert({
                  message: 'No es posible habilitar las ordenes!',
                  size: 'small'
                })

              }

            }

          })

        }

        $scope.load1 = function () {

          window.location.href = `../../index.html`

        }

        $scope.load2 = function () {

          const valores = window.location.search;

          var sId = valores.slice(4, 84);

          window.location.href = "../../indexb.html?id=" + sId;

        };

        $scope.load3 = function () {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.gn1.hash_ = sId;

          window.location.href = "ordquema.html?id=" + $scope.gn1.hash_;

        };

        $scope.cleanforms = function () {
          $("#formord")[0].reset();
        }

      }])

function is_numeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
}
