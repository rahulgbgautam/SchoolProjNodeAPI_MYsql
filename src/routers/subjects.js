const express = require("express");
const subjects = new express.Router();
const conn = require("../db/conn");


subjects.get('/api/subjects',(req, res) => {
  let sqlQuery = "SELECT subjects.subject_name, teachers.name FROM subjects INNER JOIN teachers ON subjects.teacher_id=teachers.id";
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
subjects.get('/api/subjects/:id',(req, res) => {
  let sqlQuery = "SELECT subjects.subject_name, teachers.name FROM subjects INNER JOIN teachers ON subjects.teacher_id=teachers.id WHERE subjects.id=" + req.params.id;
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});

subjects.post('/api/subjects',(req, res) => {
  let data = {teacher_id: req.body.teacher_id, subject_name: req.body.subject_name};
  let sqlQuery = "INSERT INTO subjects SET ?";
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
subjects.put('/api/subjects/:id',(req, res) => {
  let sqlQuery = "UPDATE subjects SET teacher_id='"+req.body.teacher_id+"', subject_name='"+req.body.subject_name+"' WHERE id="+req.params.id;
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   

subjects.delete('/api/subjects/:id',(req, res) => {
  let sqlQuery = "DELETE FROM subjects WHERE id="+req.params.id+"";
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
      res.send(apiResponse(results));
  });
});

function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

module.exports = subjects;