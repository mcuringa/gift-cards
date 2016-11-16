//cards.js

/**
    cards.js is the main controller for 
    views and events.
*/



function main()
{
    // showHome();
    alphabet();
}


function showView(id)
{
    $(".view").addClass("hidden");
    $(id).removeClass("hidden");
}

