Using the GiftCard data API
===========================

_Examples of how to create, load, store, save, and search gift cards._

Loading Gift Cards
------------------
### Loading a giftcard from the database

T o load a gift card, the desired key is passed in and pulled from local storage where it is stored using JSON syntax. The json syntax is then converted to a Giftcard object.

```javascript

	data.load = function(key)
	{
	    var val = data.db.getItem(key);
	    return JSON.parse(val);
	}


Storing Gift Cards
------------------
### Storing the gift cards

Gift Cards are stored in the browser's local storage and will not be deleted even if the browser is closed.


```javascript

	data.db = localStorage;
	var str = JSON.stringify(val);
    data.db.setItem(key, str);


Saving Gift Cards
-----------------

### Saving a gift card

	Gift Cards are saved one at a time to localStorage then the function data.save updates all cards and returns the index of the saved card.

Searching for Gift Cards
------------------------

###Searching for a new GiftCard
This example shows how to search for a giftcard using the letters that the name starts with.

```javascript

	findByName("FOO");


Creating and modifying gift cards
---------------------------------

### Creating a new gift card
This example shows how to create a new gift card set some properties and then save it to the database.

```javascript

// initialize a new card
var card = new GiftCard();

//set some properties
card.firstName = "Foo";
card.lastName = "Bar";
card.email = "foo@xample.com";

//save it to the (local) datase
data.save(card);


```
