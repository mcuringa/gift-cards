//cards.js

/**
    cards.js is the main controller for 
    views and events.
*/

function showView(id)
{
    $(".view").addClass("hidden");
    $("#" + id).removeClass("hidden");
    switch(id)
    {
    	case "home":
    		showHome();
    		break;
    	case "list":
    		showList();
    		break;
        case "detail":
            showDetail();
            break;
        case "admin":
            showAdmin();
            break;
        default:
            alert("No view implemented for " + id);

    }

}

function registerListeners()
{
	//register listeners
    $("#top-nav button").click(function(e) {
    	var btn = $(e.target);
    	var id = btn.data("target");
    	showView(id);
    });
}

function main()
{
    data.init();
    registerListeners();
    showView("home");
}


main(); 