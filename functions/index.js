const functions = require("firebase-functions");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const express=require("express");
const app= express();
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tdcx-dasboard.firebaseio.com",
});

app.use(cors());
app.use(bodyParser.json());

app.post("/authenticate", async (req, res)=>{
  const {Id, name}=req.body;

  // check for user
  const usersRef = admin.firestore().collection("users");
  const snapshot = await usersRef.where("Id", "==", Id).get();
  const users = [];
  snapshot.forEach((doc) => {
    users.push({uid: doc.id, ...doc.data()});
  });
  const user=users[0];
  // if user is found return user details
  if (user.name===name) {
    res.json({success: true, user});
  } else {
    res.json({success: false, message: "user not found"});
  }
});


exports.webApp = functions.https.onRequest(app);
