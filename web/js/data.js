//data.js

/*
 * contains initial data for testing
 * and functions for accessing/writing
 * data
 */

var GiftCard = function () {
    this.id = 0;
    this.firstName = "";
    this.lastName = "";
    this.notes = "";
    this.balance = 0;
    this.email = "";
    this.phone = "";
    this.transactions = [];
    this.created = Date();
    this.modified = Date();
};

GiftCard.prototype.toString = function () {
    return "<(id: " + this.id + ") " + this.firstName + " " + this.lastName + ", $" + this.balance + ">";
}

GiftCard.prototype.addTransaction = function(tx) 
{
    var newBalance = this.balance + tx.amt;
    if(newBalance< 0)
        return false;
    this.balance = newBalance;
    this.transactions.push(tx);
    this.modified = Date();

    return true;


};


var Transaction = function(amt, type)
{
    this.amt = amt;
    this.type = type;
    this.created = Date();

}


var data = {};

data.counter = 0;

data.findAll = function()
{
	console.log(testData);
    $("#main").html(testData.toString());
    return testData;

};

data.findByName = function(name)
{
    for (var i=0; i < testData.length; i++){
    var namecat = testData[i].firstName + " " + testData[i].lastName
	    if(namecat == name){
	        console.log(testData[i]);
	        return  $("#main").html("name" + testData[i].toString());
	    }
	}


};
/*
data.findByName = function(name){
	var show = _.findWhere(testData,{name: name}); 
	 console.log(show);
	 return show;
};
data.findByPhone = function(phone){
	var show = _.findWhere(testData.shows, {phone: phone}); 
	 console.log(show);
	 return show;
};


*/
data.findByPhone = function(phone)
{
	var phoneCat=phone.replace(/-|\s/g,"");
		console.log(phoneCat);
  for (var i=0; i < testData.length; i++){
    if(phoneCat == testData[i].phone){
        
        console.log(testData[i]);
        return  $("#main").html("phone number" + testData[i].toString());
	} 
  }
};


data.search = function(query)
{
    // version 1    
    //check query against name, email, phone


    	data.findByPhone(query)
   
    	data.findByName(query)
    	return;
    
};



data.save = function(gc)
{
    //save the card to the DB, return the saved object
};

data.createCard = function(name, amt, phone)
{
    data.counter += 1;
    var card = new GiftCard();
    card.id = data.counter;
    card.firstName = name.split(" ")[0];
    card.lastName = name.split(" ")[1];
    card.phone = phone;
    card.addTransaction(new Transaction(amt, "card-purchase"));

    return card;
};



var testData = 
[
    data.createCard("Kai Williams", 10, 5555555555),
    data.createCard("Ryan Sobeck", 5, 8888888888),
    data.createCard("Filiz C.", 20, 9999999999),
    data.createCard("Austen Cortese", 10, 2222222222),
    data.createCard("Robby Lucia", 30, 4444444444)
];


//data.findByName("Kai Williams");
//data.findByPhone("222 2-222222");
//data.findAll();
data.search("kai williams");


