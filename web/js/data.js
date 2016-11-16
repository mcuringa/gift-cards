//data.js

/*
 * contains initial data for testing
 * and functions for accessing/writing
 * data
 */

var GiftCard = function() 
{
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
    return testData;
};

data.findByName = function(name)
{
    //return all of the gift cards
};

data.findByPhone = function(phone)
{

}

data.search = function(query)
{
    // version 1    
    //check query against name, email, phone
}



data.save = function(gc)
{
    //save the card to the DB, return the saved object
};

data.createCard = function(name, amt)
{
    data.counter += 1;
    var card = new GiftCard();
    card.id = data.counter;
    card.name = name;
    card.addTransaction(new Transaction(amt, "purchase"));
    return card;
};



var testData = 
[
    data.createCard("Kai Williams", 10),
    data.createCard("Ryan Sobeck", 5),
    data.createCard("Filiz C.", 20),
    data.createCard("Austen Cortese", 10)
];







