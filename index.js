const app = require('express')()
const hbs = require('hbs')
var cors = require('cors')
const fs = require('fs');

app.use(cors())
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render("index");
});


//send add msg to server v1
app.get('/newmessage',cors(), (req, res) => {
  var value = req.param('value');
  console.log(value)
  var data = readFileSync("data.txt","utf8")
  console.log(data)
  var newData = data+"\n"+value;
  fs.writeFile("data.txt", newData)
  res.send(newData);
});


//send list msg to user
app.get('/readmessage',cors(), (req, res) => {
    fs.readFile("data.txt", 'utf8', function (err,data) {
    console.log(data);
    res.send(data);
})});
app.listen(process.env.PORT || 3000)

