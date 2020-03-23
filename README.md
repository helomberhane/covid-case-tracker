
# COVID-19 CASE TRACKER

This is a React-based dashboard for monitoring Ethiopia's COVID-19 cases using Google Maps and geographic feature data to model existing confirmed cases and medical facilities by administrative regions.

To get started, first you'll need to obtain a Google Maps API Key.
[How to get a Google Maps Key](https://developers.google.com/maps/documentation/javascript/get-api-key)

Next, clone/download the project and in the main directory create a file called `.env`  to store the Google Maps API key like in the link below.


https://gist.github.com/helomberhane/2da30ae2cf61df2b2d656c316fb05205

Simply replace `YOUR_GOOGLE_MAPS_API_KEY` with your key. Do not share your Google Maps key or push it up publicly.

In the main directory run:

`npm install`

`npm start`


To deploy, run

`npm deploy`

I am pulling data for coronavirus cases and medical facilities from two Google Spreadsheets using Sheetsu. Edit the files in `src/action` to update the endpoint URLS if wanting to pull your own data. I've also included some geographic data in the `src/data` folder for mapping Ethiopia specifically.

**DO NOT DISPLAY LATITUDE/LONGITUDE COORDINATES, LOCATION PINS, PRECISE LOCATION MARKERS, OR ANY PERSONALLY IDENTIFIABLE INFORMATION FOR CORONAVIRUS CASES ANYWHERE ON THE MAP OR ENTIRE WEBSITE, REGARDLESS IF THEY CONFIRMED OR UNCONFIRMED OR SELF-REPORTED. THERE ARE REPORTS OF PEOPLE BEING ATTACKED FOR SUSPICIONS OF HAVING CORONAVIRUS AND YOU COULD POTENTIALLY ENDANGER THEIR LIVES. FOR THAT REASON I’M AGGREGATING CASES BY REGION.**

**Article Link:**
[State warns foreigners 'attacked' in Ethiopia over coronavirus fears](https://bit.ly/396WJXm)

**AS LONG AS YOU DO NOT MISUSE THIS APPLICATION IN THIS WAY YOU ARE FREE TO USE THIS SOFTWARE.**

**CURRENTLY LOCATION MARKERS ARE ONLY BEING USED TO INDICATE THE LOCATION OF HOSPITALS/MEDICAL FACILITIES.**

## Expanding
Although this dashboard is centered on tracking COVID-19 in Ethiopia one could easily recenter the map anywhere and update the GeoJson file to make this a general purpose COVID-19 tracker for any region powered with Google Maps. All you need is a GeoJson file of your desired region and a unique ID number for each administrative region and make sure your recorded cases include a region ID as a property. Only one administrative region is used in this project (Admin Region 3) but you can update that accordingly in the code with additional files to change the scope of the observed region. The same applies for the medical facililties data.

You can use the following example tables/columns linked below. Copy the column headers and connect them via a service like Sheetsu or the Google Sheets API to send your data to the map to begin tracking immediately. Some empty columns may be included since these data were pulled as a subset from OCHA Humanitarian data exchange records from larger tables.

Feel free to fork and submit pull requests for improvements.

Coronavirus Case Tracker Spreadsheet
https://docs.google.com/spreadsheets/d/1qI_Hag8ANEzVJZ1fRAVSODHkRU8KfWGBoCT3tb0Dmvw/edit?usp=sharing

Medical Facilities Tracker Spreadsheet
https://docs.google.com/spreadsheets/d/1Baiu0pMGf00zb1GDqlu9cYjWjSxGb7Ovctii6JkwlDA/edit?usp=sharing
