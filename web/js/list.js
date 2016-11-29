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
    var table = $("#list tbody");
    var cards = data.findAll();
    for(var i=0; i<cards.length; i++)
    {
        var row= "<tr>";
        row += td(cards[i].firstName);
        row += td(cards[i].lastName);
        row += td(cards[i].balance);
        row += td(cards[i].phone);
        row += "</tr>";
        table.append($(row));

//dynamically create a new row for cards[i]
    }


}

function td(cell)
{
    return "<td>" + cell + " </td>";
}