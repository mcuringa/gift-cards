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

GiftCard.prototype.toString = function () 
{
    return "<(id: " + this.id + ") " + this.firstName + " " + this.lastName + ", $" + this.balance + ">";
}

GiftCard.prototype.toJson = function () 
{
    var json = ""
    json += "{"
    json += "id: "
    json += this.id +","
    json += "firstName: "
    json += this.firstName+","
    json += "lastName: "
    json += this.lastName+","
    json += "notes: "
    json += this.notes+","
  //json += "balance: "
  //json += this.balance+","
    json += "email: "
    json += this.email+","
    json += "phone: "
    json += this.phone+","
  //json += "transactions: "
  //json += this.transactions
    json += "Date Created: "
    json += this.created.toJSON()+","
    json += "Date Modified: "
    json += this.modified.toJSON()+","
    json += "transactions: ["
    for(var i=0;i<this.transactions.length; i++)
    {
        json += this.transactions[i].toJson();
        json += ","
    }
    json += "]"
    json += " }"

    

    return json;
};



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

// static counter of unique Ids
GiftCard.COUNTER = 0;


var Transaction = function(amt, type, barrista)
{
    this.amt = amt;
    this.type = type;
    this.created = Date();
    this.barrista = barrista;


}
Transaction.prototype.toJson = function()
{
    var json = "";
        json += "{"
        json += "amount: " 
        json += this.amt + ", " 
        json += "type: "  
        json += this.type + ", " 
        json += "created: " 
        json += this.created.toJSON()+ ", " 
        json += "barrista: "   
        json += this.barrista    
        json += "}"

    return json;  
}


var data = {};

//---------------------------------- the basic data structures and indices
//all of the gift cards, indexed by id
data.cards = {};

//the counterId sequence
data.counter = 1;

//list of all of the Ids stored
data.ids = [];

//index of emails
data.emails = {};

//index of phone numbers
data.phones = {};

//make the database a property of data
//so that it can be changed if needed
data.db = localStorage;

/**
 * initialize the database
 * by loading all of the
 * giftcards and indexs
 * into memory
 */
data.init = function()
{
    data.ids = data.load("ids");

    data.emails = data.load("emails");
    data.phones = data.load("phones");
    data.cards = {};
    for(var i=0;i<data.ids.length;i++)
    {
        var id = data.ids[i];
        data.cards[id] = data.load("card_" + id);
    }
}

data.store = function(key, val)
{
    var str = JSON.stringify(val);
    console.log("storing: " + key);
    console.log("json: " + str);

    data.db.setItem(key, str);
    return str;
}

data.load = function(key)
{
    var val = data.db.getItem(key);
    console.log("loading: " + key);
    console.log("parsing: " + val);
    return JSON.parse(val);
}


/**
 * this function updates all of the 
 * database indices.
 * they are only updated in memory
 * until `save()` is called.
 * return null
 */
data.index = function(gc)
{
    data.ids.push(gc.id);
    data.emails[gc.email] = gc.id;
    data.phones[gc.phone] = gc.id;
}

data.saveIndex = function()
{
    data.store("ids", data.ids);
    data.store("emails", data.emails);
    data.store("phones", data.phones);
}

/**
 * save a single card to localStorage
 * also, update all in-memory and saved
 * indices.
 * return the new id
 */
data.save = function(gc)
{
    //save the card to the DB, return the saved object
    if(gc.id ==0)
    {
        gc.id = data.nextId();
    }
    data.index(gc);
    data.db.setItem("card_" + gc.id, gc);
    data.saveIndex();
    return gc.id;
};


data.nextId = function() 
{
    data.counter++;
    return data.counter;
}

data.findAll = function()
{
    $("#main").html(testData.toString());
    return testData;

};

data.get = function(id)
{
    var gc = data.cards[id];
    return gc;
}

data.findByName = function(name)
{
    for (var i=0; i < testData.length; i++){
    var namecat = testData[i].firstName + " " + testData[i].lastName
	    if(namecat == name){
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
  for (var i=0; i < testData.length; i++){
    if(phoneCat == testData[i].phone)
    {  
        return  $("#main").append("phone number" + testData[i].toString());
	} 
  }
};


data.search = function(query)
{
    // version 1    
    //check query against name, email, phone, etc.
}

data.createCard = function(name, amt, phone)
{
    var card = new GiftCard();
    // card.id = data.nextId();
    card.id = 0; //id should be zero until saved
    card.firstName = name.split(" ")[0];
    card.lastName = name.split(" ")[1];
    card.phone = phone;
    card.addTransaction(new Transaction(amt, "card-purchase"));

    return card;
};



var testData = 
[
    data.createCard("Kai Williams", 10, "5555555555"),
    data.createCard("Ryan Sobeck", 5, "8888888888"),
    data.createCard("Filiz C.", 20, "9999999999"),
    data.createCard("Austen Cortese", 10, "2222222222"),
    data.createCard("Robby Lucia", 30, "4444444444")
];


data.findByName("Kai Williams");
data.findByPhone("222 2-222222");
data.findAll();


