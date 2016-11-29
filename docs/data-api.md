Using the GiftCard data API
===========================

_Examples of how to create, load, store, save, and search gift cards._

<<<<<<< HEAD
data is a dictionary of arrays that stores all Gift Cards in the database.

##**Creating Gift Cards**


##**Loading Gift Cards**

##**Storing Gift Cards** 

##**Saving Gift Cards** 

##**Searching for Gift Cards** 
=======

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

>>>>>>> 2c9257ab614d652af6f9a48a6793c926a73da09a
