# Author: Laxminarayan Chandrashekar
# This is a simple Flask based Python API server
# It supports two endpoints
# '/'displays welcome message to user as a html file and points the user to the API endpoint below to fetch movie list
# '/imdb' is a GET API endpoint, which will read the imdb.json file present in this repo and return it back to the user as a JSON

# Ensure to install Flask library before proceeding to start this API server
# To run this server and test the output, please execute this file in Python console.

# The API server will run on 127.0.0.1:5000 by default

import os
from flask import Flask, jsonify, request, render_template, url_for, json
app = Flask(__name__)


# Define the default route and return a HTML template with information about this API server to user

@app.route('/')
def test_page():
    # Return the template index.html file from template folder when user hits the default route
    return render_template('index.html')


# Mock IMDB API which will read the imdb.json file present in this project and return back to the user as a JSON
# To support local testing, have enabled CORS

@app.route('/imdb', methods=['GET'])
def testfn():
    filename = os.path.join(app.root_path, 'imdb.json')
    data = json.load(open(filename))
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# Re route the user to our default route if they hit a non existent route
# This can be modified to show an error page as well, if needed

@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 200


# This starts the API server with debugging enabled.
app.run(debug=True)
