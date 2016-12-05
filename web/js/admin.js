
// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '650022570617-csn0ptofu4jiuhmhl3fqcqgpa707cjeq.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() 
{
    console.log("checking auth");
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
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';
        loadSheetsApi();
    } else {
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
    var discoveryUrl =
        'https://sheets.googleapis.com/$discovery/rest?version=v4';
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
        var table = $("<table></table>");
        for (var i = 0; i < sheet.values.length; i++) 
        {
            var tr = $("<tr></tr>");
            var row = sheet.values[i];
            for(var j=0;j<row.length;j++)
            {
                var td = $("<td></td>");
                td.html(row[j]);
                tr.append(td);
            }
            table.append(tr);
        }
        $("#admin").html("");
        $("#admin").append(importBtn);
        $("#admin").append(table);
    }, 
    function(response) 
    {
        console.log('Error: ' + response.result.error.message);
    });
}



function showAdmin()
{
    $("#admin").html("admin...");
    checkAuth();
    loadSheetsApi(importCards);
}