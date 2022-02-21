const app = require('express')()
const hbs = require('hbs')
var cors = require('cors')
const fs = require('fs');
const date = require('date-and-time')

app.use(cors())
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render("index");
});


//send add msg to server v1
app.get('/newmessage',cors(), (req, res) => {
  var value = req.query.value;
  console.log(value)
  var data = fs.readFileSync("data.txt",{encoding:'utf8', flag:'r'})
  console.log(data)
  const now  =  new Date();
  const nowDate = date.format(now,'YYYY/MM/DD HH:mm:ss');
  fs.writeFileSync("data.txt", nowDate+"-"+value+"<br/>",{flag:'a+'})
  var newData = fs.readFileSync("data.txt",{encoding:'utf8', flag:'r'})
  res.send(newData);
});


//send list msg to user
app.get('/readmessage',cors(), (req, res) => {
    fs.readFile("data.txt", 'utf8', function (err,data) {
    console.log(data);
    res.send(data);
})});
app.listen(process.env.PORT || 3000)

