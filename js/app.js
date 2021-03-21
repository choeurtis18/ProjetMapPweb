$(document).ready(function(){
    /* Variable */
    var activePopup = false;
    var regions;
    var gameEnd = false;
    var items = [];
    var listeRegion = [
        'Auvergne-Rhone-Alpes',
        'Bourgogne-Franche-Comte',
        'Bretagne',
        'Centre-Val-de-Loire',
        'Corse',
        'Grand-Est',
        'Haut-de-france',
        'Normandie',
        'Ile-De-France',
        'Nouvelle-Aquitaine',
        'Occitanie',
        'Pays-de-la-loire',
        "Provence-Alpes-Cote-D-Azur"
    ];

    // Get parametre pour recuperer le type de jeu
    var url =  window.location.href;
    var newUrl = new URL(url);
    var gameType = newUrl.searchParams.get("gameType");
    window.onload = loadGame()
    
/////////////////////////////////////////////////////////////////////////////////////////////
//Parametre general
    ////////////// GET RANDOM NUMBER //////////////
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    ////////////// SELECT ALL REGIONS //////////////
    function getAllRegion(){
        let r = document.getElementsByClassName("region");
        let tab = new Array();

        for(let i=0; i < r.length; ++i){
            tab.push(r[i]);
        }

        return tab;
    }

    ////////////// LOAD THE GAME //////////////
    function loadGame() {
        regions = getAllRegion(); //Select all country 

        if(gameType == 1){
            gameOne();
        }else {
            initListenerRegion();
            gameTwo();
        }
    }
    
    ////////////// LOAD THE GAME OR GO TO THE MENU //////////////
    function endGameReload() {
        if(regions.length <= 0) {
            window.alert("GG fin du jeu");
            regions = getAllRegion();
            var awser = confirm("Voulez vous rejouer ?");
            if (awser == true) {
                if(gameType == 1) {
                    gameOne()
                } else {
                    gameTwo()
                }
            } else {
                newUrl = "change.html"
                document.location.href = newUrl;
            }
        }
    }

    // loading JSON file (scriptJs.json)
    $.getJSON( "assets/scriptJs.json", function( data ) {
        let tab = [];
        tab.push(data["region"]);
        tab = tab[0];

        for(var i in tab) {
            items.push(tab[i]);
        }

    });
/////////////////////////////////////////////////////////////////////////////////////////////

    ////////////// Game 1 //////////////
    ////////////// Init liste regions //////////////
    function initListeRagion() {
        for(let i = 0; i < listeRegion.length; i++){
            $(".flex-region-container").append("<div>" +
                                                listeRegion[i]+
                                                "</div>");
        }
    }
    
    ////////////// FIND REGION'S NAME //////////////
    function gameOne() {   
        let IndexRegion = getRandomInt(regions.length); //Random number

        //Selected region informations
        let regionMistery = regions[IndexRegion];
        let regionMisteryName = regionMistery.id;

        /////// Game information ///////
        var codeHTML;
        codeHTML =  '<h3 id="region_question">Where is this region ?</h3>' +
                    '<input class="answer-input" type="text" name="player_answer" id="player_answer" required>' +
                    '<input class="answer-btn" type="submit" id="answer_btn" value="Confirm">' ;
        
        //var divGameInformation = document.getElementById("game_information");
        $("#game_information").html(codeHTML);
        initListeRagion() ;
        let player_answer = $("#player_answer");//Name of the country

        regionMistery.classList.add("region_coloration");//Add color to the select country
        
        //Test
        console.log("Region = " + regionMisteryName);
        
        $("#answer_btn").on("click", function(){        
            if(player_answer.val() == regionMisteryName){
                window.alert("Bravo, c'est bien " + regionMisteryName);
                regions.splice(IndexRegion, 1);
                regionMistery.classList.remove("region_coloration");
                
                //Active popub avec les info de la region
                activePopup = true;
                addPopup(regionMisteryName);
            }else{
                window.alert("Mais non, c'etait " + regionMisteryName);
                regionMistery.classList.remove("region_coloration");
            }
            gameEnd = true;

            if(gameEnd == true & regions.length > 0) {
                gameOne();
            }else {
                endGameReload();
            }
        })
    }
    ////////////// Fin Game 1 //////////////

    
    ////////////// Game 2 //////////////
    // Init le click event sur les regions
    function initListenerRegion() {
        $.each(regions, function() {
            $(this).click(function () {
                let regionName = this.id;

                console.log("Region select = " + regionName);  
                verifregion(regionName);
            });
        })
    }

    // Verifie si la c'est le bon pays qui a ete trouve
    function verifregion(regionName) {
        if(regionName == regionMisteryName){
            window.alert("Bravo, c'est bien " + regionMisteryName);
            regions.splice(regionMisteryName, 1);
            addPopup(regionMisteryName);
        }else{
            window.alert("Mais non, c'etait " + regionName);
        }

        if(regions.length > 0) {
            gameTwo();
        }else {
            endGameReload();
        }
    }

    // FIND REGION POSITION
    function gameTwo() {
        let regionIndex = getRandomInt(regions.length);//Random number

        //Selected country informations
        let regionMistery = regions[regionIndex];
        regionMisteryName = regionMistery.id;

        /////// Game information ///////
        var codeHTML;
        codeHTML =  '<h3 id="region_question">Where is this region ?</h3>' +
                    '<span id="select_region_name">'+regionMisteryName+'</span>' ;
        
        var divGameInformation = document.getElementById("game_information");
        divGameInformation.innerHTML = codeHTML ;
        
    }
    ////////////// Fin Game 2 //////////////


    ///////////// create popup ///////////// 
    function addPopup(indexRegion) {
        // Get the popup
        let popup = document.getElementById("myPopup");

        // Get the button that opens the popup
        let btn = document.getElementById("myBtn");

        // Get the <span> element that closes the popup
        var spanClose = document.getElementsByClassName("popup-close")[0];

        // When the user clicks the button, open the popup 
        if(activePopup == true) {
            popup.style.display = "block";

            $.each(items, function() {
                if(this["nom"] == indexRegion) {    
                    $("#popup-title").text(this["nom"]);
                    $("#popup-body-superficie").text(this["Superficie"]);
                    $("#popup-body-population").text(this["population"]);
                    $("#popup-body-description").text(this["description"]);

                    let imageUrl = "../img/"+this["nom"]+".png";
                    $("#popup-img-div").css("background-image", "url(" + imageUrl + ")");
                    console.log($("#popup-img-div").css("background-image")); 
                }
            });
        }

        // When the user clicks on <span> (x), close the popup
        spanClose.onclick = function() {
            popup.style.display = "none";
        }

        // When the user clicks anywhere outside of the popup, close it
        window.onclick = function(event) {
            if (event.target == popup) {
                popup.style.display = "none";
            }
        }
    }
   
});