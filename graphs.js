// set dimensions margins of graph
var margin_conf = {top: 10, right: 10, bottom: 30, left: 60},
    width = 660 - margin_conf.left - margin_conf.right,
    height = 400 - margin_conf.top - margin_conf.bottom;

// append svg object to body
var svg_conf = d3.select("#conf-interval")
  .append("svg")
    .attr("width", width + margin_conf.left + margin_conf.right)
    .attr("height", height + margin_conf.top + margin_conf.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_conf.left + "," + margin_conf.top + ")");

//Read data
//need to spin up server to read locally 
 d3.csv("rtData.csv", function(data) {

    parseDate = d3.timeParse("%Y-%m-%d");
    // Add X axis
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return parseDate(d.date) }))
      .range([ 0, width ]);
    svg_conf.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return d.rt_upper })])
      .range([ height, 0 ]);
    svg_conf.append("g")
      .call(d3.axisLeft(y));

 

    // Show confidence interval
    svg_conf.append("path")
      .datum(data)
      .attr("fill", "#cce5df")
      .attr("stroke", "none")
      .attr("d", d3.area()
        .x(function(d) { return x(parseDate(d.date)) })
        .y0(function(d) { return y(d.rt_lower) })
        .y1(function(d) { return y(d.rt_upper) })
        );

    // Add the line
    svg_conf
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(parseDate(d.date)) })
        .y(function(d) { return y(d.rt_mean) })
        );
});


/*
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listRows);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 
function listRows(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1Vpn0bVPvSypRLM_uxpE9Zp_6Ft_Hg09b7r5CLtviswg',
    range: 'A1:D101',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const data = res.data.values;
    if (data.length) {
      console.log(data);
      // set dimensions margins of graph
      var margin_conf = {top: 10, right: 10, bottom: 30, left: 60},
      width = 660 - margin_conf.left - margin_conf.right,
      height = 400 - margin_conf.top - margin_conf.bottom;

      // append svg object to body
      var svg_conf = d3.select("#conf-interval")
      .append("svg")
      .attr("width", width + margin_conf.left + margin_conf.right)
      .attr("height", height + margin_conf.top + margin_conf.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin_conf.left + "," + margin_conf.top + ")");

      //Read data
      //need to spin up server to read locally 
      //d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_IC.csv",function(data) {
      // d3.csv("file.csv",function(data) {
      // Add X axis
      var x = d3.scaleLinear()
        .domain([1,100])
        .range([ 0, width ]);
      svg_conf.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 13])
        .range([ height, 0 ]);
      svg_conf.append("g")
        .call(d3.axisLeft(y));

      // Show confidence interval
      svg_conf.append("path")
        .datum(data)
        .attr("fill", "#cce5df")
        .attr("stroke", "none")
        .attr("d", d3.area()
          .x(function(d) { return x(d.x) })
          .y0(function(d) { return y(d.CI_right) })
          .y1(function(d) { return y(d.CI_left) })
          )

      // Add the line
      svg_conf
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return x(d.x) })
          .y(function(d) { return y(d.y) })
          )
    } else {
      console.log('No data found.');
    }
  });
}
*/
