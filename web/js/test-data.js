
var test = {};
test.assertTrue = function(obj, msg)
{
    if(!msg)
        msg = obj.toString() + " is false, expected true";
    if(!obj)
        throw Error(msg);
};

test.assertEqual = function(a,b, msg)
{
    if(!msg)
        msg = a.toString() + " does not equal " + b.toString();
    if(a != b)
        throw Error(msg);
};


function log(msg) { console.log(msg); }

function buildTestCard()
{
    // return data.createCard("Matt Curinga", 40, "917-555-5555");
    var card = new GiftCard();
    card.id = 0;
    card.firstName = "Matt";
    card.lastName = "Curinga";
    card.addTransaction(new Transaction(40, "init", "AM"));
    card.phone = "917-555-5555";
    return card;

}

function testCreateCard()
{
    log("testing create cards");
    var card = buildTestCard();
    test.assertEqual(card.firstName, "Matt");
    test.assertEqual(card.lastName, "Curinga");
    test.assertEqual(card.balance, 40);
    test.assertEqual(card.phone, "917-555-5555");
    test.assertEqual(card.id, 0);
    test.assertTrue(typeof card.created == typeof new Date(), "created not of type Date, found type: " + typeof card.created);
    test.assertEqual(card.modified.getFullYear(), new Date().getFullYear());
    test.assertEqual(card.transactions.length, 1);
    var tx = card.transactions[0];
    test.assertEqual(tx.amt, 40);
    test.assertEqual(tx.type, "init");
    test.assertEqual(tx.barrista, "AM");

}

function testSaveCard()
{
    log("testing saving new card");
    var card = buildTestCard();
    test.assertEqual(card.id, 0);
    var id = data.save(card);
    test.assertTrue(id > 0, "expected id to be greater than 0");
    test.assertEqual(id, card.id, "expected card.id and id to match");
}

function testInit()
{
    log("testing init");
    data.init();
    test.assertTrue(data.ids);
    test.assertTrue(data.emails);
    test.assertTrue(data.phones);
    test.assertTrue(data.cards);

}

function testGet()
{
    log("testing get");
    data.db.clear();
    var card = buildTestCard();
    var id = data.save(card);
    log(data.cards);
    // test.assertEqual(1, data.cards.length);

    data.init();
    var card2 = data.get(id);
    test.assertTrue(card2, "get() return null");
    test.assertEqual(card.firstName, card2.firstName, "names didn't match after DB load");
}

function testJSON()
{
    log("testing json");
    var card = buildTestCard();
    var json = card.toJSON();
    var card2 = new GiftCard();
    card2.parseJSON(json);
    test.assertEqual(card.id, card2.id);


}



function setUp()
{
    log("setting up tests");
    log("clearing all data");
    data.db.clear();
}


function runTests()
{
    log("running all tests");
    setUp();
    
    testJSON();
    log("passed testJSON");
    
    testCreateCard();
    log("passed testCreateCard");
    
    testSaveCard();
    log("passed testSaveCard");

    testInit();
    log("passed testInit");
    
    testGet();
    log("passed testGet");
}

runTests();