const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const conn = require("./db/conn");
const students = require("./routers/students");
const subjects = require("./routers/subjects");
const teachers = require("./routers/teachers");
app.use(bodyParser.json());
app.use(students);
app.use(subjects);
app.use(teachers);


   



// <------------------------ subject ------------------------->



// <------------------------ teacher ------------------------->


function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});