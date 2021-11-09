    angular.module("gn", [])
      .controller("gnController", ["$scope", "$http", function($scope, $http) {


        $scope.init = function() {

          const valores = window.location.search;

          var sId = valores.substr(4,80);

          $('#capture').hide();
          $('#list1').hide();
          $('#list2').hide();
          $('#context').hide();

          $scope.gn1.hash_ = sId;

          $http.post("../../datusr.php", angular.toJson($scope.gn1))
            .then(function(respuesta) {

              $datos = respuesta.data;

              if ($datos[0]['cvezone'] != " ")
              {

                $scope.gn1.zone = $datos[0]['cve'];
                $scope.gn1.user = $datos[0]['user_'];
                $scope.gn1.typeu = $datos[0]['tu'];
                $scope.gn1.id = $datos[0]['id'];

                $scope.complement("fl");
                $scope.complement("al");
                $scope.complement("co");

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

            $scope.gn1.hash_ = sId;

            window.location.href = "../../index2.html?id=" + $scope.gn1.hash_;

        };

        $scope.options1 = function(opciones) {

            var zona = $scope.gn1.zone;

            $scope.gn1.typeb = opciones;
            $scope.gn1.order = 0;
            $scope.gn1.code = 0;
            $scope.gn1.supplier = "0";

            $http.post("../../options1.php", angular.toJson($scope.gn1))
              .then(function(respuesta) {

                $Receive = respuesta.data;

                arrlista = [];

                for (let i = 0; i < this.$Receive.length; i++) {
                    arrlista.push($Receive[i]["data_val"]);
                }

                switch (opciones)
                {
                  case "iorder":
                    $scope.gn1.listo = arrlista;
                    $('#list1').show();
                    break;
                  case "isupplier":
                    $('#capture').show();
                    $scope.gn1.list1= arrlista;
                    break;
                  case "tickett":
                    $('#capture').show();
                    $('#list1').hide();
                    $('#list2').hide();
                    $scope.gn1.list1= arrlista;
                    break;
                }

            });

        };

        $scope.evaloption = function(opcion) {

          if (typeof($scope.gn1.sele1) != "undefined") {

            switch ($scope.gn1.type)
            {
              case "isupplier":

                if (typeof($scope.gn1.listo) == "undefined")
                {
                  $('#list1').show();

                  var iPosicion = $scope.gn1.sele1[0].indexOf(" ");

                  var extrae = $scope.gn1.sele1[0].substr(0, iPosicion);

                  $scope.gn1.supplier = extrae;

                  $scope.gn1.typeb = "sorder";
                }
                else
                {
                  $scope.gn1.typeb = "oticket";
                  $scope.gn1.order = $scope.gn1.sele2[0];
                  $('#list2').show();
                }

                  break;
            }

            if ($scope.gn1.type != "tickett")
            {
                $scope.gn1.sele2 = [];
                $scope.gn1.sele6 = [];

                $http.post("../../options1.php", angular.toJson($scope.gn1))
                      .then(function(respuesta) {

                        $Receivelo = respuesta.data;

                        arrlis1 = [];

                        for (let i = 0; i < this.$Receivelo.length; i++) {
                            arrlis1.push($Receivelo[i]["data_val"]);
                        }

                        switch(opcion){
                          case 1:
                            $scope.gn1.listt = arrlis1;
                            break;
                          case 2:
                            $scope.gn1.listt = arrlis1;
                            break;
                          case 3:
                            $scope.gn1.listo = arrlis1;
                            break;
                        }

                  });
            }

          }
          else
          {

              switch(opcion) {
                case 1:

                  $('#list2').show();
                  $scope.gn1.typeb = "oticket";

                  $scope.gn1.order = $scope.gn1.sele2[0];
                  $scope.gn1.code = 0;
                  $scope.gn1.supplier = "0";
                  break;

                case 2:

                    $('#list2').show();

                    if (is_numeric( $scope.gn1.sele1[0])==true) {
                      $scope.gn1.code =  $scope.gn1.sele1[0];
                      $scope.gn1.supplier ="";
                    }
                    else
                    {
                      $scope.gn1.code =  0;
                      $scope.gn1.supplier = $scope.gn1.sele1[0];
                    }

                    $scope.gn1.order = $scope.gn1.sele2[0];

                    $scope.gn1.typeb = "ticket";

                    break;

              }

              $http.post("../../options1.php", angular.toJson($scope.gn1))
                  .then(function(respuesta) {

                    $Receivelo = respuesta.data;

                    arrlis1 = [];

                    for (let i = 0; i < this.$Receivelo.length; i++) {
                        arrlis1.push($Receivelo[i]["data_val"]);
                    }

                    switch(opcion){
                      case 1:
                        $scope.gn1.listt = arrlis1;
                        break;
                      case 2:
                        $scope.gn1.listt = arrlis1;
                        break;
                    }



              });



          }

        };

        $scope.complement = function(opcion) {

            $scope.gn1.typef = opcion;

            $http.post("../../datflet.php", angular.toJson($scope.gn1))
              .then(function(respuesta) {

                $Receive = respuesta.data;

                arrcomple = [];

                for (let i = 0; i < this.$Receive.length; i++) {
                    arrcomple.push($Receive[i]["data_val"]);
                }

                switch(opcion) {
                  case "fl":
                    $scope.gn1.listfle = arrcomple;
                    break;
                  case "al":
                    $scope.gn1.lista = arrcomple;
                    break;
                  case "co":
                    $scope.gn1.listc = arrcomple;
                    break;

                }



            });

        };

        $scope.save = function() {

            bootbox.confirm("Confirma asignar el ticket!", function(result){

                if (result == true){

                    var baneje =0;

                    if (typeof($scope.gn1.type) == "undefined"){baneje = 1; }

                    if (typeof($scope.gn1.sele1) == "undefined"){baneje = 1; }

                    if (typeof($scope.gn1.sele3) == "undefined"){baneje = 1; }

                    if (typeof($scope.gn1.envy) == "undefined"){baneje = 1; }

                    if (baneje == 0){

                      switch ($scope.gn1.type)
                      {
                        case "tickett":
                          $scope.gn1.ticket = $scope.gn1.sele1[0];
                          break;
                        case "iorder":
                          $scope.gn1.ticket = $scope.gn1.sele6[0];
                          break;
                        case "isupplier":
                          $scope.gn1.ticket = $scope.gn1.sele6[0];
                          break;
                      }


                      var iPosicion = $scope.gn1.sele3[0].indexOf(" ");
                      var extrae = $scope.gn1.sele3[0].substr(0, iPosicion);

                      $scope.gn1.forwarder = extrae;

                        if (typeof($scope.gn1.sele4) == "undefined"){
                          $scope.gn1.liftingm = "null";
                        }
                        else
                        {
                          iPosicion = $scope.gn1.sele4[0].indexOf(" ");
                          extrae = $scope.gn1.sele4[0].substr(0, iPosicion);

                          $scope.gn1.liftingm = extrae;
                        }

                        if  (typeof($scope.gn1.sele5) == "undefined"){
                          $scope.gn1.harvester = "0";
                        }
                        else
                        {
                          iPosicion = $scope.gn1.sele5[0].indexOf(" ");
                          extrae = $scope.gn1.sele5[0].substr(0, iPosicion);

                          $scope.gn1.harvester = extrae;

                        }

                        $http.post("../../saveupt.php", angular.toJson($scope.gn1))
                          .then(function(respuesta) {

                            $Resulta = respuesta.data;

                            bootbox.alert("El ticket " + $Resulta[0]["ticket"] + " fue asignado a " + $Resulta[0]["fullnamefleter"] + "!", function(){

                                const valores = window.location.search;

                                var sId = valores.substr(4,80);

                                $scope.gn1.hash_ = sId;

                                window.location.href = "../../index2.html?id=" + $scope.gn1.hash_;

                            });

                        });

                    }

                    if (baneje == 1){

                        bootbox.alert({
                            message: "No es posible asignar ticket, algun campo vacio o defina una opcion de la barra principal!",
                            size: 'small'
                        });

                    }

                }



            });

        };

      }]);

function is_numeric(value) {
	return !isNaN(parseFloat(value)) && isFinite(value);
}
