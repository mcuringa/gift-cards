/**
 * data.js
 * contains initial data for testing
 * and functions for accessing/writing
 * data.
 * defines models for `GiftCard` and `Transaction`
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
    this.created = new Date();
    this.modified = new Date();
};

/**
 * initializes this `GiftCard` from a JSON string
 * @param json a json string representing a `GiftCard`
 * @return this `GiftCard` for chaining
 */
GiftCard.prototype.parseJSON = function(json) 
{
    var data = JSON.parse(json);
    this.init(data);

    var txData = data["transactions"];
    
    if(!txData)
        return this;
    
    for( var i = 0; i < txData.length; i++)
    {
        var tx = new Transaction();
        tx.init(txData[i]);
        this.addTransaction(tx);

    }
    return this;
}

GiftCard.prototype.init =function(data)
{
    if(data["id"])
        this.id = data["id"];
    
    this.firstName = data["firstName"];
    this.lastName = data["lastName"];
    this.notes = data["notes"];
    this.email = data["email"];
    this.phone = data["phone"];
    this.created = new Date(data["created"]);
    this.modified = new Date(data["modified"]); 
}


GiftCard.prototype.toJSON = function () 
{

    var txJSON = new Array(this.transactions.length);
    for(var i=0;i<this.transactions.length; i++)
    {
        var tx = this.transactions[i].toJSON();
        txJSON[i] = JSON.parse(tx);
    }


    var json = {
        id:  this.id ,
        firstName:  this.firstName,
        lastName:  this.lastName,
        notes:  this.notes,
        email:  this.email,
        phone:  this.phone,
        created:  this.created.toJSON(),
        modified:  this.modified.toJSON(),
        transactions: txJSON
    };

    return JSON.stringify(json);
};

GiftCard.prototype.addTransaction = function(tx) 
{
    var newBalance = this.balance + tx.amt;
    if(newBalance< 0)
        return false;
    this.balance = newBalance;
    this.transactions.push(tx);
    this.modified = new Date();

    return true;
};

// static counter of unique Ids
GiftCard.COUNTER = 0;


var Transaction = function(amt, type, barrista)
{
    this.amt = amt;
    this.type = type;
    this.created = new Date();
    this.barrista = barrista;
};

Transaction.prototype.toJSON = function()
{

    var json = 
    {
        amt: this.amt,
        type: this.type,
        created: this.created,
        barrista: this.barrista
    };
    return JSON.stringify(json);
};

Transaction.prototype.parseJSON = function(json)
{
    var data = JSON.parse(json);
    this.init(data);
};

Transaction.prototype.init = function(data)
{
    this.amt = data["amt"];
    this.type = data["type"];
    this.created = new Date(data["created"]);
    this.barrista = data["barrista"];

};

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
    if (!data.ids)
        data.ids=[];

    data.emails = data.load("emails");
    data.phones = data.load("phones");
    data.cards = {}; 
    data.session = {};
    data.allCards = [];
    data.admin = {};
    data.admin.sheetId = '1XDyXISt8nvktsiFYaJFeuKG8dhU0fTAzOx0AzjaPvng';

    for(var i=0;i<data.ids.length;i++)
    {
        var id = data.ids[i];
        var card = new GiftCard();
        card.parseJSON(data.db.getItem("card_" + id));
        data.cards[id] = card;
        data.allCards.push(card);
    }
}

data.store = function(key, val)
{
    var str = JSON.stringify(val);
    data.db.setItem(key, str);
    return str;
}

data.load = function(key)
{
    var val = data.db.getItem(key);
    return JSON.parse(val);
}

data.clear = function(key)
{
    data.emails = {};
    data.phones = {};
    data.cards = {};
    data.allCards = [];
    data.ids = [];
    data.db.clear();
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
    console.log(data.ids);
    data.ids.push(gc.id);
    data.allCards.push(gc);
    // data.emails[gc.email] = gc.id;
    // data.phones[gc.phone] = gc.id;
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
 * @return the new id of the `GiftCard`
 */
data.save = function(gc)
{
    //save the card to the DB, return the saved object
    if(gc.id == 0)
    {
        gc.id = data.nextId();
    }
    data.index(gc);
    data.db.setItem("card_" + gc.id, gc.toJSON());
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
    return  _.sortBy(cards, 'modified');
};

data.get = function(id)
{
    var gc = data.cards[id];
    return gc;
};


data.findByName = function(name)
{  
    name = name.toLowerCase();
    var result=[];
    var cards = data.findAll();
    for (var i=0; i < cards.length; i++)
    {
	    if(cards[i].lastName.toLowerCase().startsWith(name) || cards[i].firstName.toLowerCase().startsWith(name))
        {
           result.push(cards[i]); 
           console.log(cards[i]);
        }
        
    }   
    return result;
};

data.findByPhone = function(phone)
{
  var phoneCat=phone.replace(/-|\s/g,"");
  var result=[];
  var cards = data.findAll();
  for (var i=0; i < cards.length; i++){

    if(cards[i].phone.startsWith(phone))
    {
        result.push(cards[i]);
        console.log(cards[i]);
    } 
  }return result;
};


data.search = function(query)
{
    // version 1    
    //check query against name, email, phone
    return  (data.findByName(query));  
};


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
    data.createCard("Kai Williams", 10, "212-455-1231"),
    data.createCard("Kai William", 1, "212-555-1237"),
    data.createCard("Ryan Sobeck", 5, "212-545-1232"),
    data.createCard("Filiz C.", 20, "210-555-1233"),
    data.createCard("Austen Cortese", 10, "212-555-1234"),
    data.createCard("Robby Lucia", 30, "212-555-1635"),
    data.createCard("Alexandra Turturro", 15, "212-555-1236")
];


// data.findByName("Kai Williams");
//data.findByPhone("222 2-222222");
//data.findAll();
//data.search("kai will111iams");


