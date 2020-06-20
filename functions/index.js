"use strict";

const functions = require("firebase-functions");

// Express used to handle http api requests
const express = require("express");
const cors = require("cors");
const hbs = require('express-handlebars');

const app = express();

// Get a reference of firestore for read/write options
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

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
  /*
    Image Data
    Product Name
    Description of product
    Seller
    Influencer who's marketting it
  */
  // Get product data from firestore using data's productid
  res.render("product", data);
});

exports.addBusiness = functions.https.onRequest((req, res) => {

  if (req.method === "PUT") {
    return res.status(403).send("Forbidden!");
  }

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  return cors(req, res, () => {
    // [END usingMiddleware]
    // Reading date format from URL query parameter.
    // [START readQueryParam]
    let format = req.query.format;
    // [END readQueryParam]
    // Reading date format from request body query parameter
    if (!format) {
      // [START readBodyParam]
      format = req.body.format;
      // [END readBodyParam]
    }
    // // [START sendResponse]

    const businessName = req.body.business;

    // Data to be added to the new document named businessName
    let data = {
      Products: {},
      influencers: {}
    };

    const doc = admin.firestore().doc('users/' + businessName).set(data);

    // ADD HANDLEBAR CODE
    
    res.status(200).send();
    // [END sendResponse]
  });

});

// Cloud function used to listen for updates/publishes in businesses and assign them to influencers
exports.assignInfluencer = functions.firestore
  .document('businesses/{userId}')
  .onCreate((snap, context) => {

    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = snap.data();

    // The Id of the business document
    const businessId = context.params.userId

    // Access a particular field as you would any JS property
    const businessField = newValue.field;

    // Get all the influencers as a document
    const influencersRef = db.collection('influencers');
    const allInfluencers = citiesRef.where('interests', '==', businessField).get()
      .then(snapshot => {

          let influencerId = snapshot.key;
          context.params.influencers.arrayUnion(influencerId);

          snapshot.update({
            businesses: admin.firestore.businesses.arrayUnion(businessId)
          });

      })
      .catch(err => {
          console.log('Error getting documents', err);
      });
    
  });
