$(document).ready(function(){

// BASE DE DATOS DE CHARACTERS********************************
  game = {}
  game.characters = []
  game.parties = []

  var charactersData = {
  
    "utils":{
      // "container":".Expo",

      plusStats:function(valor,selectStat, boton, acambiar){

        if (charactersData.globals.iniPoints !== 0) {
          charactersData.globals.iniPoints -=1;
          valor +=1;
          boton.parents('.prueba').find(".stat01").text(valor);
          boton.parents('.prueba').attr("value", valor);
          acambiar.text(charactersData.globals.iniPoints);
        }
      },

      minusStats:function(valor,selectStat, boton, acambiar){

        if (charactersData.globals.iniPoints < 20) {
          
          if (boton.parents('.prueba').attr("value") >0 ){
            charactersData.globals.iniPoints +=1;
            valor -=1;
            boton.parents('.prueba').find(".stat01").text(valor);
            boton.parents('.prueba').attr("value", valor);
            acambiar.text(charactersData.globals.iniPoints);

          }  
        }    
      },    
    },

    "globals":{
      "iniPoints": 5,
      "selection_pointer": true,
    },

    "fighter": { 
            name:"THE FIGHTER",
            tipo:".fighter", 
            descript:"Experto en todas las armas y tecnicas de combate, la vanguardia del equipo!!",
            habilidades:"Habilidades principales: Fuerza y Destreza",
            img:"",
          },

    "wizard": { 
            name:"THE WIZARD", 
            tipo:".wizard", 
            descript:"Magia y poderes, los magos no tienen limites conocidos con tiempo y preparacion",
            habilidades: "Habilidades principales: Inteligencia",
            img:"",
          },

    "cleric": { 
            name:"THE CLERIC", 
            tipo:".cleric", 
            descript:"Energia sagrada, pura y santificada, llevan la palabra de sus dioses y ejercen sus designios ",
            habilidades:"Habilidades principales: Carisma y Fuerza",
            img:"",
          },
          
    "rogue": { 
            name:"THE ROGUE",
            tipo:".rogue",  
            descript:"Habiles agentes de la oscur dad, no hay reja q los contenga nni obetivo imposible para ellos. ",
            habilidades:"Habilidades principales: Destreza e Inteligencia",
            img:"",
          },

    "bard": { 
            name:"DA BARD",
            tipo:".bard",  
            descript:"Alegres agentes del destino, viajeros y recolectores de conocimiento, su voz llaman a la batalla e inspian la grandeza en todos: ",
            habilidades:"Habilidades principales: Carisma y Destreza",
            img:"",
          },

  };

  var newCharacter ={
      "name":"",
      "ChaClass":"",
      "fuerza":"",
      "dextreza":"",
      "inteligencia":"",
      "constitucion":"",
      "apariencia":"",
      "chaIma":"", 

  };

// AQUI SE DA EL CLICK Y EMPIEZA EL SHOW ESCOGIENDO CLASE

  $( ".selection_panel").on("click", ".createTeam", function(){

    $("#createPanel").removeClass("hide");
    $(".iniPoints").text(charactersData.globals.iniPoints);

  });

// ASIGNANDO VALORES*********************************************

// SUMA

  $("#createPanel").on("click",".plusButton", function(){

      var valor = parseInt($(this).parents('.prueba').attr("value"));    

      var selectStat = $(this).parents('.prueba').attr("stat");

      charactersData.utils.plusStats( valor,selectStat, $(this),$(".iniPoints"));

  });


// RESTA    

  $("#createPanel").on("click",".minusButton", function(){

      var valor = parseInt($(this).parents('.prueba').attr("value"));    
      var selectStat = $(this).parents('.prueba').attr("stat");
     
      charactersData.utils.minusStats( valor,selectStat, $(this),$(".iniPoints"));
     
  });


  $(".picture_galery").on("click", ".cha_image", function(){

      newCharacter.chaIma = $(this).attr("src");
    
    });  

   
// BOTON SAVE ************************************************   

  $(".finalChoice").on("click", ".checkButton", function(){

      if ( $("#cajaFinal > div").length <3) {


          if (charactersData.globals.iniPoints == 0) {

            // se asigna valores a newcharacter
            newCharacter.name = $("#selectedName").val();

            newCharacter.fuerza= $("#fuerza").text();

            newCharacter.dextreza= $("#destreza").text();

            newCharacter.inteligencia= $("#inteligencia").text();

            newCharacter.constitucion= $("#constitucion").text();

            newCharacter.apariencia= $("#apariencia").text();

            newCharacter.chaClass= $("select").val();

            $(".prueba").attr("value", 0);
            $(".stat01").text(0);
            $("#selectedName").val("");

            charactersData.globals.iniPoints = 5;


            // se crea variable  savedCha a base de newCharacter y se guarda en game.characters
            var savedCha = JSON.stringify(newCharacter); 

              console.log(savedCha);
              console.log(newCharacter);

            game.characters.push(savedCha);

            // se agrega imagen y nombre a personaje_listo
            $(".pj_listo_imagen").attr("src", newCharacter.chaIma);
            $(".pj_listo_name").text(newCharacter.name);            

            // se hace una copia (clon) y se pone en #cajaFinal
            $(".personaje_listo").clone().appendTo("#cajaFinal");
         
            // se hace aparecer al clon cambiando sus clases        
            $("#cajaFinal").find('div').removeClass(" hide pj_listo_imagen pj_listo_name personaje_listo "); 
          
            $("#cajaFinal").find('h4').removeClass(" pj_listo_name"); 
            $("#cajaFinal").find('img').removeClass("pj_listo_imagen "); 

            $("#cajaFinal > div").addClass("challenger");

          }
            
          if ( $("#cajaFinal > div").length ==3){
            $("#readyBaby").removeClass('disabled');
            $("#namePartie").removeClass('hide');
          }

               
      }

    });
  


// BOTON RESET ***********************************************

  $(".finalChoice").on("click", ".resetButton", function(){

      $(".prueba").attr("value", 0);

      $(".stat01").text(0);

      $("#selectedName").val("");

      newCharacter.ChaClass = "";

      charactersData.globals.iniPoints = 5;

  });

// BORRANDO PJ CREADO *****************************************

  $("#cajaFinal").on("click", ".challenger", function(){


    game.characters.splice($(this).index(), 1);
    
    $(this).remove();

    // Vuelve a desahilitar boton hasta q haya 3 personajes
    if ( $("#cajaFinal > div").length <3) {

        $("#readyBaby").addClass('disabled');
        $("#namePartie").addClass('hide');        
    };


  });

// ACTIVANDO BOTON PARTIE LISTO

  $(".finalButton").on("click", "#readyBaby", function(){
    localStorage.setItem('game', JSON.stringify(game))



  });
  

// LLAVE FINAL***************************************************
});


    // localStorage.setItem('game', JSON.stringify(game))

    // if('localStorage' in window && window['localStorage'] !== null){
    //   alert('ok');
    //   var storage = localStorage
    // }
    // else {alert('mal muy mal')}