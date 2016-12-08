/** 
 * detail.js
 * this view will allow users
 * - to see all of the details of a single giftcard
 * - to edit core information in that card
 * - and to add transactsions
 */
function showDetail()
{   
      var card;
    
    if(data.session["card"])
    {
        card = data.session["card"]
        console.log("aaa");
    }
    else
    {
        card = new GiftCard();
    
        console.log("bb");
    }
    
    
    console.log(card.firstName);
  
    $("#firstName").val(card.firstName);

    $("#lastName").val(card.lastName);
    //console.log("phone: " + card.phone);
    $("#phone").val(card.phone);

    $("#email").val(card.email);

    $("#balance").html(card.balance);

    var table = $("#detail tbody");
    for(var i=0; i<card.transactions.length; i++)

    {

        //some html code to add a tx to a list or table
        var row = "<tr>";
        row += td(card.created);
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
    
    var card = new GiftCard();

//set some properties
    card.firstName= $("#firstName").val();
    card.lastName = $("#lastName").val();
    card.phone = $("#phone").val(); 
    card.email= $("#email").val();
    card.barrista=$("#barrista").val();
    if(card.id == 0)
    {
        var amt = Number($("#balance").val());
        var tx = new Transaction(amt, "initial", "AU");
        card.addTransaction(tx);
        data.session.card = card;
    }

    //save it to the (local) datase
    data.save(card);
    showDetail();
    console.log(data.findAll()[data.findAll().length-1]);


});

$("#add").click(function(){
    
    var card = data.session["card"];

    var amt = Number($("#tx").val());

    var tx = new Transaction(amt, "new amount", "AU");
    card.addTransaction(tx);

    data.save(card);
  
    console.log(card);


});
