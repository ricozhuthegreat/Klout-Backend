"use strict";

const functions = require("firebase-functions");

// Express used to handle http api requests
const express = require("express");
const cors = require("cors");
const hbs = require('express-handlebars');

const app = express();

// Automatically allow cross-origin requests (start middleware)
app.use(cors({ origin: true }));
app.engine('handlebars', hbs({
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
}));
app.set('view engine', 'handlebars');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
app.get("/:productid/:influencerid", function(req,res){
  data = {
    productId: req.params.productid,
    influencerId: req.params.influencerid
  }
  // Get product data from firestore using data's productid
  res.render("product", data);
});
exports.influence = functions.https.onRequest((req, res) => {

  if (req.method === "PUT") {
    return res.status(403).send("Forbidden!");
  }

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  return cors(req, res, () => {
    // [END usingMiddleware]
    // Reading date format from URL query parameter.
    // [START readQueryParam]
    // let format = req.query.format;
    // [END readQueryParam]
    // Reading date format from request body query parameter
    // if (!format) {
    //   // [START readBodyParam]
    //   format = req.body.format;
    //   // [END readBodyParam]
    // }
    // // [START sendResponse]
    // const formattedDate = moment().format(format);
    // console.log("Sending Formatted date:", formattedDate);
    // res.status(200).send(formattedDate);
    // [END sendResponse]
  });

});

// Cloud function used to listen for updates/publishes in businesses and assign them to influencers
exports.assignInfluencer = functions.firestore
  .document('businesses/{userId}')
  .onWrite((change, context) => {
    // Get an object with the current document value.
    // If the document does not exist, it has been deleted.
    const document = change.after.exists ? change.after.data() : null;

    // Get an object with the previous document value (for update or delete)
    const oldDocument = change.before.data();

    // perform desired operations ...
  });