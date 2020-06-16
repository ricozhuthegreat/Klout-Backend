"use strict";

const functions = require("firebase-functions");

// Express used to handle http api requests
const express = require("express");
const cors = require("cors");

// Automatically allow cross-origin requests (start middleware)
app.use(cors({ origin: true }));

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

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
