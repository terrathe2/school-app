const bodyParser = require('body-parser');
const ejs = require('ejs');
const express = require('express');
const app = express();

const index = require("./Routers/index");
const subject = require("./Routers/subject");
const teacher = require("./Routers/teacher");
const student = require("./Routers/student");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use("/", index);
app.use("/", teacher);
app.use("/", subject);
app.use("/", student);

app.listen(2500, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("port 2500 aktif");
  }
})
