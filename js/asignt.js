/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-template */
/* eslint-disable unicorn/prefer-string-slice */
/* eslint-disable comma-spacing */
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

          $('#capture').hide()
          $('#list1').hide()
          $('#list2').hide()
          $('#context').hide()

          $scope.gn1.hash_ = sId

          $http.post('../../datusr.php', angular.toJson($scope.gn1))
            .then(respuesta => {

              $datos = respuesta.data

              if ($datos[0].cvezone != ' ') {

                $scope.gn1.zone = $datos[0].cve
                $scope.gn1.user = $datos[0].user_
                $scope.gn1.typeu = $datos[0].tu
                $scope.gn1.id = $datos[0].id

                $scope.gn1.typef = 'fl'

                $http.post('../../carriers.php', angular.toJson($scope.gn1))
                .then(function (respon33) {

                  $recib = respon33.data

                  dato = [];
                  // eslint-disable-next-line guard-for-in
                  for (element in $recib) {
                      dato.push($recib[element].descripcion)
                  }

                  $scope.gn1.listfle = dato;

                })

                $scope.gn1.typef = 'al'

                $http.post('../../carriers.php', angular.toJson($scope.gn1))
                .then(function (respon44) {

                  $reci = respon44.data

                  dats = [];
                  // eslint-disable-next-line guard-for-in
                  for (element in $reci) {
                      dats.push($reci[element].descripcion)
                  }

                  $scope.gn1.lista = dats;

                })

                $scope.gn1.typef = 'co'

                $http.post('../../carriers.php', angular.toJson($scope.gn1))
                .then(function (respon55) {

                  $recic = respon55.data

                  datc = [];
                  // eslint-disable-next-line guard-for-in
                  for (element in $recic) {
                      datc.push($recic[element].descripcion)
                  }

                  $scope.gn1.listc = datc;

                })

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

        $scope.loadticket = function (inticket) {

          var itempo = inticket
          $('#context').show()
          $scope.gn1.iticket = $scope.gn1.sele6[0]

          $http.post('../../datticket.php', angular.toJson($scope.gn1))
            .then(function (respon1) {

              $context = respon1.data[0].descripcion;

              $scope.gn1.context = $context;

          })

        }

        $scope.options1 = function (opciones) {

          const zona = $scope.gn1.zone

          $scope.gn1.typeb = opciones
          $scope.gn1.order = 0
          $scope.gn1.code = 0
          $scope.gn1.supplier = '0'

          $http.post('../../options1.php', angular.toJson($scope.gn1))
              .then(function (respuesta) {

                $Receive = respuesta.data

                arrlista = []

                for (let i = 0; i < this.$Receive.length; i++) {
                  arrlista.push($Receive[i].data_val)
                }

                switch (opciones) {
                  case 'iorder':
                    $scope.gn1.listo = arrlista
                    $('#list1').show()
                    $('#capture').hide()
                    break
                  case 'isupplier':
                    $('#capture').show()
                    $('#list1').hide()
                    $('#list2').hide()
                    $scope.gn1.list1 = arrlista
                    break
                  case 'tickett':
                    $('#capture').show()
                    $('#list1').hide()
                    $('#list2').hide()
                    $scope.gn1.list1 = arrlista
                    break
                }

              })

        }

        $scope.evaloption = function (opcion) {

          if (typeof ($scope.gn1.sele1) != 'undefined') {

            switch ($scope.gn1.type) {
              case 'isupplier':

                if (typeof ($scope.gn1.listo) == 'undefined') {
                  $('#list1').show()

                  const iPosicion = $scope.gn1.sele1[0].indexOf(' ')

                  const extrae = $scope.gn1.sele1[0].slice(0, Math.max(0, iPosicion))

                  $scope.gn1.supplier = extrae

                  $scope.gn1.typeb = 'sorder'
                } else {
                  $scope.gn1.typeb = 'oticket'
                  $scope.gn1.order = $scope.gn1.sele2[0]
                  $('#list2').show()
                }

                break
            }

            if ($scope.gn1.type != 'tickett') {
              $scope.gn1.sele2 = []
              $scope.gn1.sele6 = []

              $http.post('../../options1.php', angular.toJson($scope.gn1))
                      .then(function (respuesta) {

                        $Receivelo = respuesta.data

                        arrlis1 = []

                        for (let i = 0; i < this.$Receivelo.length; i++) {
                          arrlis1.push($Receivelo[i].data_val)
                        }

                        switch (opcion) {
                          case 1:
                            $scope.gn1.listt = arrlis1
                            break
                          case 2:
                            $scope.gn1.listt = arrlis1
                            break
                          case 3:
                            $scope.gn1.listo = arrlis1
                            break
                        }

                      })
            }
            else
            {

              if (opcion == '3')
              {
                $('#context').show();
                $scope.gn1.iticket = $scope.gn1.sele1[0];

                $http.post('../../datticket.php', angular.toJson($scope.gn1))
                        .then(function (respon1) {

                          $context = respon1.data[0].descripcion;

                          $scope.gn1.context = $context;

                        })

              }

            }

          } else {

            switch (opcion) {
              case 1:

                $('#list2').show()
                $scope.gn1.typeb = 'oticket'

                $scope.gn1.order = $scope.gn1.sele2[0]
                $scope.gn1.code = 0
                $scope.gn1.supplier = '0'
                break

              case 2:

                $('#list2').show()

                if (is_numeric($scope.gn1.sele1[0]) == true) {
                  $scope.gn1.code = $scope.gn1.sele1[0]
                  $scope.gn1.supplier = ''
                } else {
                  $scope.gn1.code = 0
                  $scope.gn1.supplier = $scope.gn1.sele1[0]
                }

                $scope.gn1.order = $scope.gn1.sele2[0]

                $scope.gn1.typeb = 'ticket'

                break

            }

            $http.post('../../options1.php', angular.toJson($scope.gn1))
                  .then(function (respuesta) {

                    $Receivelo = respuesta.data

                    arrlis1 = []

                    for (let i = 0; i < this.$Receivelo.length; i++) {
                      arrlis1.push($Receivelo[i].data_val)
                    }

                    switch (opcion) {
                      case 1:
                        $scope.gn1.listt = arrlis1
                        break
                      case 2:
                        $scope.gn1.listt = arrlis1
                        break
                    }

                  })

          }

        }

        $scope.save = function () {

          bootbox.confirm('Confirma asignar el ticket!', result => {

            if (result == true) {

              let baneje = 0

              if (typeof ($scope.gn1.type) == 'undefined') {
                baneje = 1
              }

              if (typeof ($scope.gn1.sele1) == 'undefined') {
                baneje = 1
              }

              if (typeof ($scope.gn1.sele3) == 'undefined') {
                baneje = 1
              }

              if (typeof ($scope.gn1.envy) == 'undefined') {
                baneje = 1
              }

              if (baneje == 0) {

                switch ($scope.gn1.type) {
                  case 'tickett':
                    $scope.gn1.ticket = $scope.gn1.sele1[0]
                    break
                  case 'iorder':
                    $scope.gn1.ticket = $scope.gn1.sele6[0]
                    break
                  case 'isupplier':
                    $scope.gn1.ticket = $scope.gn1.sele6[0]
                    break
                }

                let iPosicion = $scope.gn1.sele3[0].indexOf(' ')
                let extrae = $scope.gn1.sele3[0].slice(0, Math.max(0, iPosicion))

                $scope.gn1.forwarder = extrae

                if (typeof ($scope.gn1.sele4) == 'undefined') {
                  $scope.gn1.liftingm = 'null'
                } else {
                  iPosicion = $scope.gn1.sele4[0].indexOf(' ')
                  extrae = $scope.gn1.sele4[0].slice(0, Math.max(0, iPosicion))

                  $scope.gn1.liftingm = extrae
                }

                if (typeof ($scope.gn1.sele5) == 'undefined') {
                  $scope.gn1.harvester = '0'
                } else {
                  iPosicion = $scope.gn1.sele5[0].indexOf(' ')
                  extrae = $scope.gn1.sele5[0].slice(0, Math.max(0, iPosicion))

                  $scope.gn1.harvester = extrae

                }

                $http.post('../../saveupt.php', angular.toJson($scope.gn1))
                          .then(respuesta => {

                            $Resulta = respuesta.data

                            bootbox.alert(`El ticket ${$Resulta[0].ticket} fue asignado a ${$Resulta[0].fullnamefleter}!`, () => {

                              const valores = window.location.search

                              const sId = valores.slice(4, 84)

                              $scope.gn1.hash_ = sId

                              tickimg($Resulta[0].ticket);

                              window.location.href = `../../index2.html?id=${$scope.gn1.hash_}`

                            })

                          })

              }

              if (baneje == 1) {

                bootbox.alert({
                  message: 'No es posible asignar ticket, algun campo vacio o defina una opcion de la barra principal!',
                  size: 'small'
                })

              }

            }

          })

        }

        $scope.load2 = function () {

          window.location.href = "../../index.html";

        };

        $scope.load3 = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.gn1.hash_ = sId;

          window.location.href = "ordquema.html?id=" + $scope.gn1.hash_;

        };

        $scope.load4 = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $scope.gn1.hash_ = sId;

          window.location.href = "../../indexd.html?id=" + $scope.gn1.hash_;

        };

        $scope.tickimg = function(iticket) {

                  $scope.hr1.ticket = iticket;

                  $http.post("../../datatickd.php", angular.toJson($scope.hr1))
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

// eslint-disable-next-line no-multiple-empty-lines

      }])

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


function is_numeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
}
