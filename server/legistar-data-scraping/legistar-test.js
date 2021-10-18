const request = require('request');
const fs = require('fs');
const https = require('https');
const rp = require('request-promise');
const token = "Uvxb0j9syjm3aI8h46DhQvnX5skN4aSUL0x_Ee3ty9M.ew0KICAiVmVyc2lvbiI6IDEsDQogICJOYW1lIjogIk5ZQyByZWFkIHRva2VuIDIwMTcxMDI2IiwNCiAgIkRhdGUiOiAiMjAxNy0xMC0yNlQxNjoyNjo1Mi42ODM0MDYtMDU6MDAiLA0KICAiV3JpdGUiOiBmYWxzZQ0KfQ"


// Indents <indent> number of times
function catIndent(indent) {
  let s = "";
  for (var i = 0; i < indent; i++) {
    s += '\t';
  }
  return s;
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
        //$top: 1000,
        $skip: 10
    },
    json: true // Automatically parses the JSON string in the response
};

var options = coptions;

var matterIDs = new Array(0);

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

async function fetchMatters(skip) {

  // Set options for API call
  var nops = coptions;
  nops.uri = 'https://webapi.legistar.com/v1/nyc/matters';
  nops.qs.$skip = skip;

  // Make API call
  return rp(options)
    .then(repos => {
      console.log('Fetched %d matters', repos.length);
      // Format JSON as string, set filename
      out = jsonStringify(repos);
      fname = "matters/matters" + (nops.qs.$skip / 1000).toString() + ".json";

      // Store all matterIDs in array, call fetchMatterSponsors() on them
      for (var i = 0; i < repos.length; i++) {
        matterIDs.push(repos[i].MatterId);
        fetchMatterSponsors(repos[i].MatterId);
      }

      // Write file, call next batch
      fs.writeFile(fname, out, (err) => {
        if (err) { console.log(err); }
        else {
          if (repos.length == 1000) {
              fetchMatters(skip + 1000);
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
    })
}

async function fetchMatterSponsors(matterID) {

    // Set options for API call
    var nops = coptions;
    nops.uri = 'https://webapi.legistar.com/v1/nyc/matters/' + matterID + '/Sponsors';
    nops.qs.$skip = 0;

    // Make API call
    return rp(options)
      .then(repos => {
        console.log('Fetched sponsors of matter %d ', matterID);
        // Format JSON as string, set filename
        out = jsonStringify(repos);
        fname = "mattersponsors/mattersonsors" + matterID.toString() + ".json";

        // Write file, call next batch
        fs.writeFile(fname, out, (err) => {
          if (err) { console.log(err); }
          else {
            /*  Commented out, since I assume there won't be more than 1000 sponsors ever
            if (repos.length == 1000) {
                fetchMatters(skip + 1000);
            }
            */
          }
        });
      })
      .catch(err => {
        console.log(err);
      })
}

async function fetchBodies(skip) {

  // Set options for API call
  var nops = coptions;
  nops.uri = 'https://webapi.legistar.com/v1/nyc/bodies';
  nops.qs.$skip = skip;

  // Make API call
  return rp(options)
    .then(repos => {
      console.log('Fetched %d bodies', repos.length);
      // Format JSON as string, set filename
      out = jsonStringify(repos);
      fname = "bodies/bodies" + (nops.qs.$skip / 1000).toString() + ".json";

      // Store all matterIDs in array, call fetchMatterSponsors() on them
      //for (var i = 0; i < repos.length; i++) {
      //  matterIDs.push(repos[i].MatterId);
      //  fetchMatterSponsors(repos[i].MatterId);
      //}

      // Write file, call next batch
      fs.writeFile(fname, out, (err) => {
        if (err) { console.log(err); }
        else {
          if (repos.length == 1000) {
              fetchBodies(skip + 1000);
              console.log("Survived past next call");
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
    })
}

async function fetchPersons(skip) {

  // Set options for API call
  var nops = coptions;
  nops.uri = 'https://webapi.legistar.com/v1/nyc/persons';
  nops.qs.$skip = skip;

  // Make API call
  return rp(options)
    .then(repos => {
      console.log('Fetched %d persons', repos.length);
      // Format JSON as string, set filename
      out = jsonStringify(repos);
      fname = "persons/persons" + (nops.qs.$skip / 1000).toString() + ".json";

      // Store all matterIDs in array, call fetchMatterSponsors() on them
      //for (var i = 0; i < repos.length; i++) {
      //  matterIDs.push(repos[i].MatterId);
      //  fetchMatterSponsors(repos[i].MatterId);
      //}

      // Write file, call next batch
      fs.writeFile(fname, out, (err) => {
        if (err) { console.log(err); }
        else {
          if (repos.length == 1000) {
              fetchBodies(skip + 1000);
              console.log("Survived past next call");
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
    })
}

function findAndReplace(fname, oname, find, replace) {
  fs.readFile(fname, 'utf8', function(err,data){
    if (err) { console.log(err); }
    ndat = "";
    for (var i = 0; i < data.length - find.length + 1; i++) {
      if (data.substring(i,i+find.length) == find) {
        console.log("REPLACING '" + data.substring(i,i+find.length) + "' WITH '" + replace + "'");
        ndat += replace;
        i += find.length - 2;
        console.log("NDAT: '" + ndat.substring(ndat.length - 10,ndat.length) + "'");
      }
      else {
        ndat += data[i];
      }
    }

    console.log("NDAT: '" + ndat.substring(ndat.length - 10,ndat.length) + "'");
    fs.writeFile(oname, ndat, (err) => {
      if (err) { console.log(err); }
    });
  });
}

findAndReplace("mattersponsors/nspon/mattersponsors10000.json", "mattersponsors/nspon/nmattersponsors10000.json", "[", "");
//console.log(options);
//fetchMatters(0);
//fetchBodies(0);
//fetchPersons(0);
//fetchMatterSponsors(17071);
