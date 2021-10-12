const request = require('request');
const fs = require('fs');
const https = require('https');
const rp = require('request-promise');

const token = "Uvxb0j9syjm3aI8h46DhQvnX5skN4aSUL0x_Ee3ty9M.ew0KICAiVmVyc2lvbiI6IDEsDQogICJOYW1lIjogIk5ZQyByZWFkIHRva2VuIDIwMTcxMDI2IiwNCiAgIkRhdGUiOiAiMjAxNy0xMC0yNlQxNjoyNjo1Mi42ODM0MDYtMDU6MDAiLA0KICAiV3JpdGUiOiBmYWxzZQ0KfQ"

let obj = {
  table: []
}

function catIndent(indent) {
  let s = "";
  for (var i = 0; i < indent; i++) {
    s += '\t';
  }
  return s;
}

function jsonStringify(obj) {
  let indent = 0;
  let source = JSON.stringify(obj);
  let output = "";
  let quote = false;
  for (var i = 0; i < source.length; i++) {
    if (source[i] == '"') { quote = !quote; }
    if (source[i] == '{') { indent++; output += '\n'; }
    if (source[i] == '}') { indent--; output += '\n'; output += catIndent(indent); }
    output += source[i];
    if (source[i] == ',' && !quote ) { output += '\n'; output += catIndent(indent); }
    if (source[i] == '{') { output += '\n'; output += catIndent(indent); }
  }
  output += '\n';
  return output;
}

async function createFileFromSource(target, skip, max, content, fname) {
  reval = "";
  more = true;
  console.log("Called createFileFromSource(" + target + ", " + skip + ")");
  await request('https://webapi.legistar.com/v1/nyc/' + target + '?token=' + token + '&$top=' + 1000 + '&$skip=' + skip, { json: true }, (err, res, body) => {
    if (err) { console.log("Error retrieving data"); return ""; }
    else {
      console.log("Queried with " + body.length + " results");
      if (body.length < 1000) {  more = false;  }
      else {  skip += 1000;  }
      content += jsonStringify(body);
      if (more && skip < max) {
        reval = createFileFromSource(target, skip, max, content, fname);
      }
      else {
        console.log("Writing results");
        fs.writeFile(fname + ".json", content, (err) => {
          if (err) { console.log(err); }
          //else { console.log("Successfully wrote " + target + ".json"); }
        });
        cont = false;
        return content;
      }
    }
  });
  //return reval;
}

const coptions = {
    uri: 'https://webapi.legistar.com/v1/nyc/matters',
    qs: {
        token: token, // -> uri + '?access_token=xxxxx%20xxxxx'
        stop: 1000,
        skip: 0
    },
    //headers: {
    //    'User-Agent': 'Request-Promise'
    //},
    json: true // Automatically parses the JSON string in the response
};

var options = coptions;

async function pullAndWrite(term) {
  options.uri = 'https://webapi.legistar.com/v1/nyc/' + term;
  rp(options)
      .then(function (repos) {
          console.log('Fetched %d ' + term + 's', repos.length);
          out = jsonStringify(repos);
          console.log(options.qs.stop);
          fname = term + "/" + term + (options.qs.stop / 1000).toString() + ".json";
          console.log(fname);
          fs.writeFile(fname, out, (err) => {
            if (err) { console.log(err); }
            else {
              if (repos.length == 1000) {
                  options.qs.skip += 1000;
                  options.qs.stop += 1000;
                  pullAndWrite(term);
              }
            }
          });

      })
      .catch(function (err) {
          // API call failed...
      });
}

console.log(options);
pullAndWrite("actions");
options = coptions;
pullAndWrite("bodies");
options = coptions;
pullAndWrite("bodytypes");
options = coptions;
pullAndWrite("codesections");
options = coptions;
pullAndWrite("eventitems");
options = coptions;
pullAndWrite("events");
options = coptions;
pullAndWrite("indexes");
options = coptions;
pullAndWrite("matterattachments");
options = coptions;
pullAndWrite("mattercodesections");
options = coptions;
pullAndWrite("matterhistories");
options = coptions;
pullAndWrite("matterindexes");
options = coptions;
pullAndWrite("matterrelations");
options = coptions;
pullAndWrite("matterrequesters");
options = coptions;
pullAndWrite("matters");
options = coptions;
pullAndWrite("mattersponsors");
options = coptions;
pullAndWrite("matterstatuses");
options = coptions;
pullAndWrite("mattertexts");
options = coptions;
pullAndWrite("mattertypes");
options = coptions;
pullAndWrite("officerecords");
options = coptions;
pullAndWrite("persons");
options = coptions;
pullAndWrite("rollcalls");
options = coptions;
pullAndWrite("votes");
options = coptions;
pullAndWrite("votetypes");
options = coptions;
