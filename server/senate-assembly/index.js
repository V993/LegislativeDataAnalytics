const fs = require('fs');

fs.readFile('./senate.json', 'utf8', (err, senate) => {

	if (err) console.error(err)
	
	JSON.parse(JSON.stringify(senate));
	parsedData = JSON.parse(senate);  
	senateData = parsedData.result.items
	
	senateData.forEach((e) => {
	   delete e.person;
	   delete e.sessionShortNameMap;
	   delete e.shortName;
	   delete e.alternate;
}); 	

fs.readFile('./assembly.json', 'utf8', (err, assembly) => {

	if (err) console.error(err)
	
	JSON.parse(JSON.stringify(assembly));
	aParsedData = JSON.parse(assembly);
	assemblyData = aParsedData.result.items 

	assemblyData.forEach((e) => {
	   delete e.person;
	   delete e.sessionShortNameMap;
	   delete e.shortName;
	   delete e.alternate;
});

	const strSenateData = JSON.stringify(senateData);
	const strAssemblyData = JSON.stringify(assemblyData); 

fs.writeFile('./senateData.json', strSenateData, err => {
	
	if (err) console.error(err)
});	
		
fs.writeFile('./assemblyData.json', strAssemblyData, err => {

	if (err) console.error(err)
});
	console.log(senateData)
	console.log(assemblyData)
});
});
