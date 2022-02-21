const express = require('express')
const hbs = require('hbs')
var cors = require('cors')
const app = express()
fs = require('fs');


app.use(cors())
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render("index");
});

app.get('/newmessage',cors(), (req, res) => {
  var value = req.param('value');
  console.log(value)
  fs.open("data.txt", "a", (err, fd)=>{
    console.log("fd")
    fs.write(fd, value)});
  res.send("ok");
  });
app.get('/readmessage',cors(), (req, res) => {

  fs.readFile("data.txt", 'utf8', function (err,data) {
  console.log(data);
  res.send(data);
})});

app.listen(process.env.PORT || 3000)
