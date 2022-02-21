const i = require("./index.js");

i.app.get('/readmessage',cors(), (req, res) => {

    fs.readFile("data.txt", 'utf8', function (err,data) {
    console.log(data);
    res.send(data);
})});
  