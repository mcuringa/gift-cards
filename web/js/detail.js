/** 
 * detail.js
 * this view will allow users
 * - to see all of the details of a single giftcard
 * - to edit core information in that card
 * - and to add transactsions
 */
function showDetail()
{ 	var table = $("#detail tbody");
    var card;
    
    if(data.session["card"])
        card = data.session["card"]
    else
        card = new GiftCard();
    
    // var cards = data.findAll();
    // var card = cards[0]; //just use the first card for now, while we test out the page


	$("#firstName").val(card.firstName);

	$("#lastName").val(card.lastName);
	//console.log("phone: " + card.phone);
	$("#phone").val(card.phone);

	$("#email").val(card.email);

	$("#balance").html(card.balance.toFixed(2));


	var table=("#details tbody")
	for(var i=0; i<card.transactions.length; i++)

	{
		var row= "<tr>";
		row += td(card[i].amt);
		row += td(card[i].type);
		row += td(card[i].date);
		row += td(card[i].barista);
		row += "</tr>"
		//some html code to add a tx to a list or table
		var row = "<tr>";
		row += td(card.created);
		row += td("$" +card.amt);
  		row += td(card.type);
  		row += td(card.barrista);
  
  		table.append($(row));
	}

}

function td(cell)
{
	return "<td>" + cell + "</td>";
}

$("#saveGC").click(function(){
	console.log("a" + "#saveGC")
	var card = new GiftCard();

//set some properties
	card.firstName= $("#firstName").val();
	card.lastName = $("#lastName").val();
	card.phone = $("#phone").val();	
	card.email= $("#email").val();

	if(card.id == 0)
	{
		var amt = $("#balance").val();
		var tx = new Transaction(amt, "initial", "AU");
		card.addTransaction(tx);
	}

	//save it to the (local) datase
	data.save(card);

	console.log(data.findAll()[data.findAll().length-1]);

	updateDisplay();

});

