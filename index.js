const app = require('express')()
const hbs = require('hbs')
var cors = require('cors')
const fs = require('fs');
const date = require('date-and-time')
const Str = require('@supercharge/strings')

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
  fs.writeFileSync("data.txt", nowDate+" - "+value+"<br/>",{flag:'a+'})
  var newData = fs.readFileSync("data.txt",{encoding:'utf8', flag:'r'})
  res.send(newData);
});

//send list msg to user
app.get('/readmessage',cors(), (req, res) => {
    fs.readFile("data.txt", 'utf8', function (err,data) {
    console.log(data);
    res.send(data);
})});


//New Room create
app.get('/newroom',cors(), (req, res) => {
  res.send("New room ID is:"+Str.random(10))
});
//send to user room msg
app.get('/getmsg',cors(), (req, res) => {
  var roomID = req.query.roomID;
  if(roomID == null){
    roomID=0;
  }
  console.log(roomID)
  fs.readFile("./room/"+roomID+".json", 'utf8', function (err,data) {
    if(err){
      res.send("Error");
    }else{
      res.contentType('application/json');
      res.send(data);
    }
    console.log(data);
    
})
app.get('/newmsg',cors(), (req, res) => {
  var roomID = req.query.roomID;
  var nick = req.query.nick;
  var msg = req.query.msg;
  const now  =  new Date();
  const nowDate = date.format(now,'HH:mm');


  json = JSON.parse(fs.readFileSync("room/"+roomID+".json",{encoding:'utf8', flag:'r'}))
  json.push({"nick":nick,"msg":msg,"date":nowDate})
  fs.writeFileSync("room/"+roomID+".json",JSON.stringify(json), {flag:'w'})
  res.send(JSON.stringify(json))

})
})









app.listen(process.env.PORT || 3000)

