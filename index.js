// Require important Node things
const express = require('express');
const app = express();
//const db = require('quick.db');

// set up EJS
app.set('view engine', 'ejs');
app.get('/', function(req, res) { res.render("index",{})});

app.use(express.static(__dirname + '/public')); //use public folder for all client side JS and CSS.

// LISTEN
app.listen(process.env.PORT || 8080, function(){ // start on .env defined port, or fall back to 80
    console.log("SERVER: Listening on port %d", this.address().port);
});
