/** 
 * detail.js
 * this view will allow users
 * - to see all of the details of a single giftcard
 * - to edit core information in that card
 * - and to add transactsions
 */
function showDetail()
{
    var cards = data.findAll();
    var card = cards[0]; //just use the first card for now, while we test out the page

	$("#detail").html("name: " + card.firstName);
}
