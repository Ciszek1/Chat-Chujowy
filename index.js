const express = require('express')
const hbs = require('hbs')
var cors = require('cors')
const app = express()


app.use(cors())
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render("index");
});

app.get('/newmessage',cors(), (req, res) => {
  console.log(req)
  res.status(200).end();
});
app.get('/readmessage',cors(), (req, res) => {
  fs = require('fs');
  fs.readFile("data.txt", 'utf8', function (err,data) {
  console.log(data);
  res.send(data);
})});

app.listen(1)
