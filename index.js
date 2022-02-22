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
  fs.appendFile("./room/"+roomID+".json",'[{"msg":"<b>You have been connected to the '+roomID+' chat. You can use /help to learn more</b>","nick":"Prvchat","date":"00:00"}]', function(){
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
    
  if(msg.substring(0, 1) == ":"){
    if(msg.substring(1, 2) == "B" || msg.substring(1, 2) == "b"){
      msg = "<b>"+msg.substring(2)+"</b>";
    }
    if(msg.substring(1, 2) == "I" || msg.substring(1, 2) == "i"){
      msg = "<i>"+msg.substring(2)+"</i>";
    }
    if(msg.substring(1, 2) == "M" || msg.substring(1, 2) == "m"){
      msg = "<mark>"+msg.substring(2)+"</mark>";
    }
    if(msg.substring(1, 2) == "U" || msg.substring(1, 2) == "u"){
      msg = "<u>"+msg.substring(2)+"</u>";
    }
    if(msg.substring(1, 5) == "LINK" || msg.substring(1, 2) == "link"){
      msg = '<a href="'+msg.substring(5)+'" target=“_blank”>'+msg.substring(5)+"</a>";
    }
  }
  if(msg.substring(0, 1) == "/"){
    if(msg.substring(1, 5) == "help" || msg.substring(1, 5) == "Help"){
      msg = "<br/><b>Formating text: </b><br/> :B <b>This</b> <br/> :I <i>This</i> <br/> :M <mark>This</mark> <br/> :U <u>This</u><br/><b>------</b><br/>:LINK <a href='https://google.pl/'>https://google.pl/</a><br/><br/><b>Command issued by "+nick+"</b>";
      nick = "Prvchat"
    }
  }


  json = JSON.parse(fs.readFileSync("room/"+roomID+".json",{encoding:'utf8', flag:'r'}))
  json.push({"nick":nick,"msg":msg,"date":nowDate})
  fs.writeFileSync("room/"+roomID+".json",JSON.stringify(json), {flag:'w'})
  res.send(JSON.stringify(json))

})
})


app.listen(process.env.PORT || 3000)

