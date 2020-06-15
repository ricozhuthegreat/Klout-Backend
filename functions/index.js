const functions = require('firebase-functions');

// Express used to handle http api requests
const express = require('express');
const cors = require('cors');

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.influence = functions.https.onRequest((req, res) => {



});