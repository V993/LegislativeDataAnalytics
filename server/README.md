# Database API
### Our API is hosted using AWS and contains a subset of data from the Legistar API.
### Additionally, you can see the data we have scraped from Legistar which is stored in our database here in the legistar-data-scraping directory.
### We have an accompanying API for our database which you can see here. Information about the API endpoints is below:

/graph-apis/representative-bills\
Contains sums of bills for every representative in NYC City Council. The data is organized alphabetically and is used to plot charts containing representative bills for a given daterange.\
Usage example: http://206.81.7.63:5000/graph-apis/representative-bills?startDate=2018-01-01&endDate=2021-05-05 (the "endDate" query param is optional)

/graph-apis/committee-bills\
Contains sums of bills for every committee in NYC City Council. The data is organized alphabetically and is used to plot charts contianing the total bills put forward in each committee given a daterange.\
Usage example: http://206.81.7.63:5000/graph-apis/committee-bills?startDate=2018-01-01&endDate=2021-05-05 (the "endDate" query param is optional)

/graph-apis/activeness-by-month\
Responds with the list of representatives and the number of bills they proposed for each month in a given year.\
Usage example: http://206.81.7.63:5000/graph-apis/activeness-by-month?year=2021

/graph-apis/proximity-calculation\
Contains voting records for each representative in NYC City Council. Used in our algorithm to determine politican similarity based off of voting histories. 
In the proximity-calculation directory, you'll find the C++ scripts we use to calculate distance between representatives.

### The following routes use data from the Open Legistration API
/info-apis/council-member-info\
Responds with the information of a city counciler member with given name\
Usage example:  http://206.81.7.63:5000/info-apis/council-member-info?name=Margaret%20Chin 


/info-apis/assembly-info\
Responds with the information of a assembly member with given name\
Usage example:  http://206.81.7.63:5000/info-apis/assembly-info?name=Peter%20Abbate 

/info-apis/senate-info\
Responds with the information of a senate member with given name\
Usage example:  http://206.81.7.63:5000/info-apis/senate-info?name=Jamaal%20Bailey 

/graph-apis/state-committee-bills/assembly\
Responds with a list of assembly members and the number of bills they proposed in a given date range\
Usage example:  http://206.81.7.63:5000/graph-apis/state-committee-bills/assembly?startDate=2020-01-01&endDate2021-01-01

/graph-apis/state-committee-bills/senate\
Responds with a list of senate members and the number of bills they proposed in a given date range\
Usage example:  http://206.81.7.63:5000/graph-apis/state-committee-bills/senate?startDate=2020-01-01&endDate2021-01-01

/graph-apis/proximity-calculation\
Responds with a list of council members and coordinates representing similarity in voting patterns to selected references
Usage example: http://206.81.7.63:5000/graph-apis/proximity-calculation?refs[]=Una_Clarke,Daniel_Dromm_,Diana_Reyna,Annabel_Palma,Bill_Perkins&targets[]=David_Yassky,Alphonse_Stabile,Mark_S._Weprin,Kenneth_K._Fisher,Eric_A._Ulrich,Betsy_Gotbaum

### Running the backend server locally
1. Make sure node.js is install on your mechine.
2. Run `npm install` from the main directory
3. Setup correct database credentials in the environment(.env file)
4. Run `node server/index.js` from the main directory
