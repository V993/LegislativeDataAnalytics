# Database API
### Our API is hosted using AWS and contains a subset of data from the Legistar API.
### Additionally, you can see the data we have scraped from Legistar which is stored in our database here in the legistar-data-scraping directory.
### We have an accompanying API for our database which you can see here. Information about the API endpoints is below:

####/graph-apis/representative-bills
Contains sums of bills for every representative in NYC City Council. The data is organized alphabetically and is used to plot charts containing representative bills for a given daterange.

####/graph-apis/committee-bills
Contains sums of bills for every committee in NYC City Council. The data is organized alphabetically and is used to plot charts contianing the total bills put forward in each committee given a daterange.

####graph-apis/proximity-calculation
Contains voting records for each representative in NYC City Council. Used in our algorithm to determine politican similarity based off of voting histories. 
