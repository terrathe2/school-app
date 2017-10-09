const bodyParser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const app = express();
const session = require('express-session');


const index = require("./Routers/index");
const subject = require("./Routers/subject");
const teacher = require("./Routers/teacher");
const student = require("./Routers/student");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: 'sma-aselole',
  resave: false,
  saveUninitialized: true
}))

app.set('view engine', 'ejs');

app.use("/", index);
app.use("/", student);
app.use("/", subject);
app.use("/", teacher);

app.listen(2500, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("port 2500 aktif");
  }
})
