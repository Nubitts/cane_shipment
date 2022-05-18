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

        $scope.load4 = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.hr1.hash_ = sId;

          window.location.href = "indexd.html?id=" + $scope.hr1.hash_;

        };


        $scope.quiteass = function(iticket) {

          console.log(iticket);

              bootbox.confirm("Esta seguro de anular la asignacion al ticket " + iticket, function(result){

                if (result == true)
                {

                  $scope.hr1.ticket = iticket;

                  $http.post("./quiteassign.php", angular.toJson($scope.hr1))
                    .then(function(respuesta) {

                      $scope.hr1.datas = respuesta.data;

                    });
                }

              });

        };

        $scope.tickimg = function(iticket) {

                  $scope.hr1.ticket = iticket;

                  $http.post("./datatickd.php", angular.toJson($scope.hr1))
                    .then(function(respuestt) {

                      $scope.hr1.zafra = respuestt.data[0].zafrad;
                      $scope.hr1.productor = respuestt.data[0].productor;
                      $scope.hr1.fletero = respuestt.data[0].fletero;
                      $scope.hr1.arrivo = respuestt.data[0].arrivaldate;
                      $scope.hr1.detalle = respuestt.data[0].detalle;
                      $scope.hr1.alzadora = respuestt.data[0].alzadora;

                      $("#myModal").modal('show');

                    });

        };

      }]);

const $boton = document.querySelector("#boton")

$boton.addEventListener("click", () => {

  $objetivo = document.querySelector("#canvas")
  $flet1 = $("#forwarder").text()
  $flet2 = $flet1.substr(0, $flet1.indexOf(' '))

  $tick1 = $("#ticket").text()

  html2canvas($objetivo,{ backgroundColor: "#58aae8" }) // Llamar a html2canvas y pasarle el elemento
    .then(canvas => {
      // Cuando se resuelva la promesa traerá el canvas
      // Crear un elemento <a>
      const enlace = document.createElement('a');
      enlace.download = "ticket-" + $tick1 + "-fletero-" + $flet2 + ".png";
      // Convertir la imagen a Base64
      enlace.href = canvas.toDataURL();
      // Hacer click en él
      enlace.click();
    });
});



