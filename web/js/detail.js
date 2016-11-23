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


	$("#firstName").val(card.firstName);

	$("#lastName").val(card.lastName);
	//console.log("phone: " + card.phone);
	$("#phone").val(card.phone);

	$("#email").val(card.email);

	$("#balance").html(card.balance.toFixed(2));
	console.log("balance:" + typeof card.balance);

	$("#amt").val(card.amt); 

	//$("#transaction").val(card.transaction); 

	for(var i=0; i<card.transactions.length; i++)
	{
		//some html code to add a tx to a list or table
	}

}



