## Sample project to render a scatter plot of top 250 movies (rating vs user votes)

A sample full stack application that renders Scatterplot chart using D3.JS v7 and uses Python Flask to fetch the data for rendering the chart.

##### Folder structure

root
┣ templates

 ┗ index.html

┣ app.py

┣ imdb.json

┣ index.html

┣ README.md

┣ script.js

┗ style.css

- `templates\index.html` is required by Flask to serve the HTML page on hitting default API
- `app.py` is our Flask API file which will be executed to start the API server to serve the movies list
- `imdb.json` is our mock JSON data for storing the movie list.
- `index.html` serves our web page for displaying the chart
- `script.js` contains the JS for fetching the data and rendering the chart on web page
- `style.css` contains the basic styling for the web site
- `README.md` renders this file

##### Steps to bypass API server (optional)

- If you do not want to start local API server, then you go `scripts.js` file and modify line # 7 to point to local JSON file instead of API server as follows:
  `d3.json("http://127.0.0.1:5000/imdb", {`
  modify this line to:
  `d3.json("/imdb.json", {`
  and save the file.

##### Steps to run the application in local machine

- Ensure to install [Python](https://www.python.org/downloads/) , [Flask library](https://flask.palletsprojects.com/en/2.0.x/installation/), [NodeJS](https://nodejs.org/en/download/) & [Node http-server tool](https://www.npmjs.com/package/http-server) in your local machine.
- Clone / Download this repo to your local machine and open this repo folder
- Execute the `app.py` file from your Python terminal to start the API server
- If the server is successfully started, you should be able to hit [http://127.0.0.1:5000/](http://127.0.0.1:5000/) and see the API welcome page load with details on the IMDB api as well
- Open VS Code/NodeJS command prompt from the current project root directory and execute `http-server . -o`
- This will start the HTTP server and serve the web page on [http://127.0.0.1:8080](http://127.0.0.1:8080) automatically and you should be able to see the chart displayed in the website
- If all goes well, there should not be any errors both in browser console and Python console.
-

##### Following are the features of the UI:

- Uses [D3.JS v7](https://github.com/d3/d3) to render the chart
- The data range for both the axes are dynamically calculated based on the data received from backend.
- This keeps the code fairly resuable for any data range in future as well.
- Added simple transition animation while loading chart, for better UX.
- Formatted the Vote counts (Y axis tick labels) to show in unit of 1000s instead of full numbers, for better UX.
- Added basic responsiveness/adaptability to viewport (needs a page refresh after resizing browser to make it work)
- Added tooltip on hovering over data point to show additional data about that movie.
- Hits the backend Python Flask API server to fetch the movie list using GET API method

##### Following are the features of the backend API:

- Uses Python Flask for implementing the API endpoint
- Enabled basic error handling by re-routing user to default endpoint , whenever any invalid endpoint is hit
- Reads a mock JSON file from local server itself and sends that back as JSON response to UI
- Supports GET API call for now and shows a html page on hitting default '/' endpoint with documentation for API.
