# Instructions
The example skeleton is given in the course upstream: 
`git pull` to ensure your instructions are up-to-date.

## Setup
- run `npm install` to install all dependencies
## Run
- run `npm run server` to start the server
- open `./index.html` file in a browser to view the app
- to test open ./test/index.test.html

Use Vue to manipulate the DOM, Vue is available as a local lib `libs/v2.6.14.vue.js` attached to HTML.
You must be able to run the code for this exercise from single HTML file, when you open
it in a browser. <br></span><br>The functionality that the Vue code must implement:

- when the page is opened
   - all players are retrieved through the JSON REST API using Fetch
   - after the fetch, a list of players' names is shown 
       - each name is a clickable link, which links to the API endpoint for the player's data. 
          - handle the link click events: under the list of links the name and active status of the player is displayed


Your task is to construct `Vue App` having template, data and methods.

Useful links:
https://vuejs.org/v2/api/#data
https://vuejs.org/v2/api/#methods

