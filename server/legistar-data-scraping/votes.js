const request = require('request');
const fs = require('fs');
const https = require('https');
const rp = require('request-promise');
const readline = require('readline');
const token = "Uvxb0j9syjm3aI8h46DhQvnX5skN4aSUL0x_Ee3ty9M.ew0KICAiVmVyc2lvbiI6IDEsDQogICJOYW1lIjogIk5ZQyByZWFkIHRva2VuIDIwMTcxMDI2IiwNCiAgIkRhdGUiOiAiMjAxNy0xMC0yNlQxNjoyNjo1Mi42ODM0MDYtMDU6MDAiLA0KICAiV3JpdGUiOiBmYWxzZQ0KfQ"

const coptions = {
    uri: 'https://webapi.legistar.com/v1/nyc/eventitems/',
    qs: {
        token: token, // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    json: true // Automatically parses the JSON string in the response
};

// Indents <indent> number of times
function catIndent(indent) {
  let s = "";
  for (var i = 0; i < indent; i++) {
    s += '\t';
  }
  return s;
}

function pad(num, size) {
    if (num > 1) {
      num = num.toString();
      while (num.length < size) num = "0" + num;
      return num;
    }
    else {
      num = num.toString();
      while (num.length < size) num = num + "0";
      return num;
    }
}

// Turns a JSON object into a nicely formatted string
function jsonStringify(obj) {
  let indent = 0;
  let source = JSON.stringify(obj);
  let output = "";
  let quote = false;
  for (var i = 0; i < source.length; i++) {
    if (source[i] == '"') { quote = !quote; }
    if (source[i] == '{' && !quote) { indent++; output += '\n'; }
    if (source[i] == '}' && !quote) { indent--; output += '\n'; output += catIndent(indent); }
    output += source[i];
    if (source[i] == ',' && !quote ) { output += '\n'; output += catIndent(indent); }
    if (source[i] == '{' && !quote) { output += '\n'; output += catIndent(indent); }
  }
  output += '\n';
  return output;
}

var record = 0;

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function pullAndWrite(id, max, doc, percent) {
  //if (id > record) { record = id; }
  //else { console.log('ID BELOW MAX: CAUGHT IN LOOP?'); }
  var options = coptions;
  options.uri = 'https://webapi.legistar.com/v1/nyc/eventitems/' + id.toString() + "/votes";
  percent = Math.round(percent * 100000) / 100000;
  //console.log(options.uri);
  rp(options)
      .then(function (objects) {
          console.log(doc + " " + pad(percent,7) + " called pullAndWrite() with id " + pad(id, 7) + " SUCCESS " + objects.length);
          //console.log(objects);
          out = jsonStringify(objects);
          fname = "votes/votes" + pad(id, 6) + ".json";
          //console.log(fname);
          fs.writeFile(fname, out, (err) => {
            if (err) { console.log(err); }
            else {
            }
            if (id < max) {
              pullAndWrite(id + 1, max);
            }
          });

      })
      .catch(function (err) {
          // API call failed...
          console.log(doc + " " + pad(percent,7) + " called pullAndWrite() with id " + pad(id, 7) + " FAILURE " + err);
          //if (err.statusCode == 500) { console.log(err)};
          if (id < max) {
            pullAndWrite(id + 1, max);
          }
      });
}


async function processLineByLine(fname,doc) {

  let ln = 0;

  const fileStream = fs.createReadStream(fname);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    ln += 1;
    let percent = 0;
    if (doc == 2) { percent = ln / 501337; }
    if (doc == 3) { percent = ln / 273385; }
    if (doc == 4) { percent = ln / 232669; }
    if (doc == 5) { percent = ln / 300349; }
    if (doc == 6) { percent = ln / 305965; }
    if (doc == 7) { percent = ln / 352369; }
    if (doc == 8) { percent = ln / 461449; }
    if (doc == 9) { percent = ln / 416197; }
    // Each line in input.txt will be successively available here as `line`.
    if (line.includes("EventItemId")) {
      //console.log(line.substring(19,line.length - 1));
      await delay(1000);
      pullAndWrite(line.substring(19,line.length - 1),0,doc,percent);
    }
  }
  if (fname == "eventitems/cat_eventitems2.json") { processLineByLine("eventitems/cat_eventitems3.json",3); }
  if (fname == "eventitems/cat_eventitems3.json") { processLineByLine("eventitems/cat_eventitems4.json",4); }
  if (fname == "eventitems/cat_eventitems4.json") { processLineByLine("eventitems/cat_eventitems5.json",5); }
  if (fname == "eventitems/cat_eventitems5.json") { processLineByLine("eventitems/cat_eventitems6.json",6); }
  if (fname == "eventitems/cat_eventitems6.json") { processLineByLine("eventitems/cat_eventitems7.json",7); }
  if (fname == "eventitems/cat_eventitems7.json") { processLineByLine("eventitems/cat_eventitems8.json",8); }
  if (fname == "eventitems/cat_eventitems8.json") { processLineByLine("eventitems/cat_eventitems9.json",9); }
}

processLineByLine("eventitems/cat_eventitems2.json",2);

//pullAndWrite(0, 1000000);
