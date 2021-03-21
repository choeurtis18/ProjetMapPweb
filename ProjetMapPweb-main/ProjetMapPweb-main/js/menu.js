$(document).ready ( function () {
    var gameOne = $("#btn_Game_One");
    var gameTwo = $("#btn_Game_Two");
    
    gameOne.click(startGameOne);
    gameTwo.click(startGameTwo);
    
    function startGameOne(){
        newUrl = "map.html?gameType=1"
        document.location.href = newUrl;
    }
    function startGameTwo(){
        newUrl = "map.html?gameType=2"
        document.location.href = newUrl;
    }
});