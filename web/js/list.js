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
    var cards = data.findAll();
    updateGCList(cards);

}

function updateGCList(cards)
{
    var list = $("#list ul");
    list.html("");
    if(cards.length == 0)
        list.html("<h3>No giftcards found</h3>");

    for(var i=0; i<cards.length; i++)
    {
        var item = $("<li></li>");
        var link = $('<button class="name-link" data-id=""></button>');

        link.data("id", cards[i].id);
        link.click(function(e)
        {
            console.log("clicking name");
           var id = Number( $(e.target).data("id") );
           console.log(id);
           var card = data.get(id);
           console.log(card);
           data.session.card = card;
           showView("edit");
        });
        link.html(cards[i].firstName + " " + cards[i].lastName + " $" + cards[i].balance);
        item.append(link);
        list.append(item);
    }
}       
    



