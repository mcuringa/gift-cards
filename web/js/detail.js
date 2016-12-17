/** 
 * detail.js
 * this view will allow users
 * - to see all of the details of a single giftcard
 * - to edit core information in that card
 * - and to add transactsions
 */
function showDetail()

{ 	

    if(!data.session["card"])
    {
        data.session["card"] = new GiftCard();
    }

	var card = data.session.card;
    $("#firstName").val(card.firstName);
    $("#lastName").val(card.lastName);
    $("#phone").val(card.phone);
    $("#email").val(card.email);
	$("#newbalance").html(card.balance);
	$("#barrista").val(card.barrista);
    $("#balance").html(card.balance);

	var table = $("#detail tbody");
	table.html("");
	for(var i=0; i<card.transactions.length; i++)
	{

		//some html code to add a tx to a list or table
		var row = "<tr>";
		row += td(card.transactions[i].created);
		row += td("$" +card.transactions[i].amt);
  		row += td(card.transactions[i].type);
  		row += td(card.transactions[i].barrista);
  	
  		table.prepend($(row));

	}
}

function td(cell)
{
    return "<td>" + cell + "</td>";
}

$("#saveGC").click(function(){
	
	// var card = new GiftCard();
	var card = data.session.card;

//set some properties
	card.firstName= $("#firstName").val();
	card.lastName = $("#lastName").val();
	card.phone = $("#phone").val();	
	card.email= $("#email").val();
	card.barrista=$("#barrista").val();

	if(card.id == 0)
	{
		var amt = Number($("#balance").val());
		var barrista= $("#barrista").val();
		var tx = new Transaction(amt, "initial", barrista);
		tx.created = dateFmt(tx.created);
		card.addTransaction(tx);
	}

	data.session.card = card;
	data.save(card);
    showDetail();
	$("#gcForm").reset();

});


$("#add").click(function()
{
	
	var card = data.session.card;
	var barrista= $("#barrista").val();
	var amt = Number($("#tx").val());

	var tx = new Transaction(amt, "new amount", barrista);
	tx.created = dateFmt(tx.created);
	
	console.log(tx.created);

	card.addTransaction(tx);

	data.save(card);
  
	console.log(card);
	showDetail();
	$("#gcForm").reset();

});

function dateFmt(d)

{	
    var mins = d.getMinutes();
    
    if(mins < 10)
    {
        mins = "0" + mins;
    }
    
    var time = d.getHours() + ":" + mins;
    var day = d.getMonth() + "-" + d.getDay() + "-" + d.getFullYear();
    
    return  day + " " + time;

	
}



var OSName="";
if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
if (navigator.userAgent.indexOf("Android")!=-1)
OSName="Android";
if (navigator.userAgent.indexOf("iPhone")!=-1 ||
    navigator.userAgent.indexOf("iPod")!=-1 ||
    navigator.userAgent.indexOf("iPad")!=-1)
OSName="IOS"
$('body').addClass(OSName);
