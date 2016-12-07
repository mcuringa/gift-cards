
// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '650022570617-csn0ptofu4jiuhmhl3fqcqgpa707cjeq.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() 
{
    gapi.auth.authorize(
    {
        'client_id': CLIENT_ID,
        'scope': SCOPES.join(' '),
        'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult)
{
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) 
    {
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';
        loadSheetsApi(importCards);
    }
    else 
    {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
        authorizeDiv.style.display = 'inline';
    }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) 
{
    gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
      handleAuthResult);
    return false;
}

/**
 * Load Sheets API client library.
 */
function loadSheetsApi(f) 
{
    var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
    gapi.client.load(discoveryUrl).then(f);
}

function importCards()
{
    gapi.client.sheets.spreadsheets.values.get(
    {
        spreadsheetId: data.admin.sheetId,
        range: 'import',
    }).then(function(response) 
    {
        var sheet = response.result;
        var importBtn = $('<button id="importBtn">import</button>');
        importBtn.click(function(){
            importSheet(sheet);
        });

        $("#admin").html("");
        $("#admin").append(importBtn);
        $("#admin").append(sheetToTable(sheet, true));
    }, 
    function(response) 
    {
        console.log('Error: ' + response.result.error.message);
    });
}

function sheetToTable(sheet, useHeader)
{
    var table = $("<table></table>");
    var start = 0;
    if(useHeader)
    {
        var thead = $("<thead></thead>");
        thead.append(makeTableRow(sheet.values[0], "th"));
        start = 1;
    }

    var tbody = $("<tbody></tbody>");
    for (var i=start; i<sheet.values.length; i++) 
    {
        tbody.append(makeTableRow(sheet.values[i]));
    }
    table.append(thead);
    table.append(tbody);
    return table;

}

function makeTableRow(row, cellType)
{
    var tr = $("<tr></tr>");
    if(cellType == "th")
        cellType = "<th></th>";
    else
        cellType = "<td></td>";

    for(var i=0;i<row.length;i++)
    {
        var cell = $(cellType);
        cell.html(row[i]);
        tr.append(cell);
    }
    return tr;
}

function importSheet(sheet)
{

    if(!window.confirm("Importing this sheet from Google will replace all local giftcards."))
        return;

    status("Importing " + (sheet.values.length-1) + " gift cards.", 1000);


    data.clear();

    for (var i=1; i<sheet.values.length; i++)
    {
        var gc = new GiftCard();
        var params = {
            "firstName": sheet.values[i][0],
            "lastName": sheet.values[i][1],
            "email": sheet.values[i][2],
            "phone": sheet.values[i][3],
            "created": sheet.values[i][5],
            "modified": sheet.values[i][6]
        };
        gc.init(params);
        gc.addTransaction(new Transaction(Number(sheet.values[i][4]), "import", "admin"));
        data.save(gc);
    }

}

function status(msg, time)
{
    if(!$("#admin .status").length)
        $("#admin").prepend('<div class="status"></div>');
    
    $("#admin .status").html(msg);
    if(time > 0)
        setTimeout(function(){$("#status").html("");}, time);
}

function showAdmin()
{
    // console.log("data");
    // console.log(data);
    $("#admin").html("");
    status("loading data...")
    checkAuth();
}