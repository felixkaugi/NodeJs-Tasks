//importing express
var express = require(express)
var app = express()
//set the port on which the web should run
const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });