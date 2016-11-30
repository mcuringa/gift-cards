/** list.js
 * create the UI for the list view
 * this view will show up if the
 * user clicks on list all, or
 * it will show the results of a search
 * (e.g. if they click on `A` it will show
 * names that start with A)
 */

function showList()
{
    var list = $("#list ul");
    var cards = data.findAll();
    // cards = testData;
    for(var i=0; i<cards.length; i++)
    {
        var item = $("<li></li>");
        var link = $('<button class="name-link" data-id=""></button>');

        link.data("id", cards[i].id);
        link.html(cards[i].firstName + " " + cards[i].lastName + " $" + cards[i].balance);
        item.append(link);
        list.append(item);
    }


}

$('.name-link').click(function(e) {

    console.log("clicking a name");
    var list= event.target;
    console.log(list);
    var id = Number( $(list).data("id") );

    //look up that giftcard
    var card = data.get(id);
    data.session.card = card;
    showView("detail");

});