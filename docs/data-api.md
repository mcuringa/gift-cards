Using the GiftCard data API
===========================

_Examples of how to create, load, store, save, and search gift cards._

Creating Gift Cards
-------------------

Loading Gift Cards
------------------

Storing Gift Cards
------------------

Saving Gift Cards
-----------------

Searching for Gift Cards
------------------------

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
