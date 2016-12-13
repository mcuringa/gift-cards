// home.js
// create the UI for the index/home view


function alphabet()
{
    var container = $("<div id='letter-buttons'></div>");
    var letters = ["A","B","C","D","E","F","G","H",
    "I","J","K","L","M","N","O","P","Q","R",
    "S","T","U","V","W","X","Y","Z"];

    for(var i=0;i<letters.length;i++)
    {
        var btn = $("<button></button>");
        var currentletter = letters[i];
        btn.html(currentletter);
        
        btn.click(function(e)
        {
           var letter = $(e.target).html();
           var names = data.search(letter);
           updateGCList(names); 
        });

        container.append(btn);
    }
    return container;
}

function showHome()
{
	var letterButtons = alphabet();
	//other things that need to happen

	$("#name-buttons").html("");
    $("#name-buttons").append(letterButtons);
    showList();
}


//$("#name-buttons").click(function(){