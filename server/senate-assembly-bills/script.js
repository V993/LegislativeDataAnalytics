const axios = require('axios');
const fs = require('fs')

let key = 'LM3odDFK6YkMApbU4Vt48v4AnLlGnfsY'

async function fetchData(year, offset) {
    try {
        res = await axios.get(`https://legislation.nysenate.gov/api/3/bills/${year}/?key=${key}&limit=1000&offset=${offset}`);
        data = res.data.result.items
        return res;
    } catch (error) {
        console.log(error)
    }
    return;
}

async function write(year) {
    let result = [];
    let offset = 1;
    let stored = false;
    while (offset <= 100000) {
        fetchData(year, offset).then((res) => {
            //modify data
            for (bill of res.data.result.items) {
                bill.billType = bill.billType.chamber ? bill.billType.chamber : null;
                if (bill.sponsor && bill.sponsor.member && bill.sponsor.member.fullName) {
                    bill.sponsor = bill.sponsor.member.fullName;
                } else {
                    bill.sponsor = null;
                }
                bill.committeeName = null;
                if (bill.status && bill.status.committeeName) {
                    bill.committeeName = bill.status.committeeName;
                } else {
                    for (item of bill.milestones.items) {
                        if (item.committeeName) bill.committeeName = item.committeeName;
                    }
                }
                delete bill.status;
                delete bill.milestones;
                delete bill.actions;
                delete bill.publishStatusMap;
            }
            result = result.concat(res.data.result.items);
            //console.log(result.length)
            if (result.length >= parseInt(res.data.total) && !stored) {
                fs.writeFileSync(`./bills${year}.json`, JSON.stringify(result), { flag: 'w' }, err => {
                    if (err) {
                    console.error(err)
                    return
                    }
                    //file written successfully
                })
                console.log("writing file")
                stored = true;
            }
        })
        .catch(e => console.log(e.message));
        offset += 1000;
        //console.log(offset)
    }

}

for (let i = 2009; i <= 2021; i+=2) {
   write(i);
}
