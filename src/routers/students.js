const express = require("express");
const students = new express.Router();
const conn = require("../db/conn");


students.get('/api/students',(req, res) => {
  let sqlQuery = "SELECT students.name, subjects.subject_name FROM students INNER JOIN subjects ON students.subject_id=subjects.id";
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
students.get('/api/students/:id',(req, res) => {
  let sqlQuery = "SELECT students.name, subjects.subject_name FROM students INNER JOIN subjects ON students.subject_id=subjects.id WHERE students.id=" + req.params.id;
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});

students.post('/api/students',(req, res) => {
  let data = {subject_id: req.body.subject_id, name: req.body.name};
  let sqlQuery = "INSERT INTO students SET ?";
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
students.put('/api/students/:id',(req, res) => {
  let sqlQuery = "UPDATE students SET subject_id='"+req.body.subject_id+"', name='"+req.body.name+"' WHERE id="+req.params.id;
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   

students.delete('/api/students/:id',(req, res) => {
  let sqlQuery = "DELETE FROM students WHERE id="+req.params.id+"";
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
      res.send(apiResponse(results));
  });
});

function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

module.exports = students;