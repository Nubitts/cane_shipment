/* eslint-disable prefer-arrow-callback */
/* eslint-disable padded-blocks */
/* eslint-disable unicorn/empty-brace-spaces */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable camelcase */
// INSERT JS HERE


// SOCIAL PANEL JS
/* const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
}); */

angular.module('gn', [])
  .controller('gnController', ['$scope', '$http', function ($scope, $http) {

        $scope.init = function () {

          $http.post('../datatick.php', angular.toJson($scope.gn1))
            .then(respuesta => {

              $datos = respuesta.data

              $scope.gn1.zafra = $datos[0].zafrad;
              $scope.gn1.ticket = $datos[0].ticket;
              $scope.gn1.fletero = $datos[0].fletero;
              $scope.gn1.productor = $datos[0].productor;
              $scope.gn1.entrega = $datos[0].arrivaldate;

            })

        }

    $scope.convert = function () {
      html2canvas(document.querySelector('#capture')).then(canvas => {
          document.body.replaceChild(canvas)
      });



    }

      }])
