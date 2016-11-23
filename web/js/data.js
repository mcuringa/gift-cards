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
    //this.burrista= burrista; 

}


var data = {};

data.counter = 0;

data.findAll = function()
{
    return testData;
};



data.findByName = function(name)
{
    for (var i=0; i < testData.length; i++){
    var namecat = testData[i].firstName + " " + testData[i].lastName
    if(namecat == name){
        console.log(testData[i]);
        return testData[i];
        
//        var tempbal = 0;
//        tempbal = tempbal + testData[i].balance;
    
    }
}
//    console.log(tempbal);
//    return tempbal;

};






data.findByPhone = function(phone)
{
  for (var i=0; i < testData.length; i++){
    var phonecat = testData[i].phone;
    if(namecat == phone){
        console.log(testData[i]);
        return testData[i];
}
  }
};


data.search = function(query)
{
    // version 1    
    //check query against name, email, phone
}



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
    data.createCard("Kai Williams", 10, "212-555-1231"),
    data.createCard("Ryan Sobeck", 5, "212-555-1232"),
    data.createCard("Filiz C.", 20, "212-555-1233"),
    data.createCard("Austen Cortese", 10, "212-555-1234"),
    data.createCard("Robby Lucia", 30, "212-555-1235"),
    data.createCard("Alexandra Turturro", 15, "212-555-1236")
];





//for (var i=0; i < testData.length; i++){
//    console.log(testData[i]);
//};

//console.log(data);

data.findByName("Robby Lucia");


//console.log(testData[1].firstName);