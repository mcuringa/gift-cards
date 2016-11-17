// home.js
// create the UI for the index/home view


function alphabet()
{
	console.log("alphabet");

    var container = $("<div id='letter-buttons'></div>");
    var letters = ["A","B","C","D","E","F","G","H","I","J","K"]; //ryan can finish this :)

    for(var i=0;i<letters.length;i++)
    {
        var btn = $("<button></button>");
        btn.html(letters[i]);
        container.append(btn);
    }
    return container;
}

function showHome()
{
	var letterButtons = alphabet();
	//other things that need to happen

	$("#home").html("");
    $("#home").append(letterButtons);
}