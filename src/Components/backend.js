var admin = require("firebase-admin");

const database = admin.database;
var fs = require("fs");
var parse = require("csv-parse");
var fs = require("fs");
var serviceAccount = require("./firebase_key.json");

// Import Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iznogood-185815.firebaseio.com/"
});

let x = fs.readFileSync("list.csv");
x = x.toString().split("\n");
x = x.map(r => r.replace("\r", "").split(","));

// Get a database reference
var db = admin.database();
var ref = db.ref("chemicals");

var populate = function() {
  x.map(data => {
    ref.child(data[0]).set({
      categorie: data[1]
    });
  });
};

populate();
// ref.set(x);
// console.log(x);
