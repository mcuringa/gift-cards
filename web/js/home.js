// home.js
// create the UI for the index/home view


function alphabet()
{
    var container = $("<div id='letter-buttons' class='view'></div>");
    var letters = ["A","B","C","D","E","F","G","H","I","J","K"]; //ryan can finish this :)
    for(var i=0;i<letters.length;i++)
    {
        var btn = $("<button></button>");
        btn.html(letters[i]);
    }

    $("#main").html("");
    $("#main").addChild(container);

}