const express = require('express');
const app = express();
const bodyParser = require('body-parser');


module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html


// Add middware for parsing request bodies here:
app.use(bodyParser.json());
//use to test
app.use((req, res, next) => {
  console.log('Middleware check: should have parsed: ');
  console.log(req.body);
})

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');


// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:

}
