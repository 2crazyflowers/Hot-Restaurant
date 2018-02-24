// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var table = [];
var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req, res) {
 res.json(table);
});

app.get("/api/waitlist", function(req, res) {
 res.json(waitList);
});


// Search for Table Requests - provides JSON
app.get("/api/:table?", function(req, res) {
 var chosen = req.params.table;

 if (chosen) {
   console.log(chosen);

   for (var i = 0; i < table.length; i++) {
     if (chosen === table[i].name) {
       return res.json(name[i]);
     }
   }
   return res.json(false);
 }
 return res.json(table);
});

// Create New reservations - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newreservation = req.body;
  newreservation.name = newreservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newreservation);

  if (table.length >= 5){
    waitlist.push(newreservation);
  }
  else{
    table.push(newreservation);
  }
  res.json(newreservation);
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});