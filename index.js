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


//New Room create
app.get('/newroom',cors(), (req, res) => {
  var roomID = Str.random(10);
  fs.appendFile("./room/"+roomID+".json",'[{"msg":"<b>You have been connected to the '+roomID+' chat</b>","nick":"Prvchat","date":"00:00"}]', function(){
    res.send("https://ciszek-test-nodejs.herokuapp.com/?room="+roomID)
  })
});
//send to user room msg
app.get('/getmsg',cors(), (req, res) => {
  var roomID = req.query.roomID;
  if(roomID == null){
    roomID=0;
  }
  fs.readFile("./room/"+roomID+".json", 'utf8', function (err,data) {
    if(err){
      res.send("Error");
    }else{
      res.contentType('application/json');
      res.send(data);
    }
    
})


//send new msg to server
app.get('/newmsg',cors(), (req, res) => {
  var roomID = req.query.roomID;
  var nick = req.query.nick;
  var msg = req.query.msg;
  const now = new Date();
  const nowDate = date.format(now,'HH:mm');
  if(msg.substring(0, 2) == "B:" || msg.substring(0, 2) == "b:"){
    msg = "<b>"+msg.substring(2)+"</b>";
  }
  if(msg.substring(0, 5) == "/help" || msg.substring(0, 5) == "/Help"){
    nick = "Prvchat"
    msg = "<br/>Formating text: <br/> B: <b>This</b> <br/> I: <i>This</i> <br/> M: <mark>This</mark>";
  }

  json = JSON.parse(fs.readFileSync("room/"+roomID+".json",{encoding:'utf8', flag:'r'}))
  json.push({"nick":nick,"msg":msg,"date":nowDate})
  fs.writeFileSync("room/"+roomID+".json",JSON.stringify(json), {flag:'w'})
  res.send(JSON.stringify(json))

})
})


app.listen(process.env.PORT || 3000)

