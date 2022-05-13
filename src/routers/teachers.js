const express = require("express");
const teachers = new express.Router();
const conn = require("../db/conn");

teachers.get('/api/teachers',(req, res) => {
  let sqlQuery = "SELECT * FROM teachers";
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
teachers.get('/api/teachers/:id',(req, res) => {
  let sqlQuery = "SELECT * FROM teachers WHERE id=" + req.params.id;
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});

teachers.post('/api/teachers',(req, res) => {
  let data = {name: req.body.name};
  let sqlQuery = "INSERT INTO teachers SET ?";
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
teachers.put('/api/teachers/:id',(req, res) => {
  let sqlQuery = "UPDATE teachers SET name='"+req.body.name+"' WHERE id="+req.params.id;  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   

teachers.delete('/api/teachers/:id',(req, res) => {
  let sqlQuery = "DELETE FROM teachers WHERE id="+req.params.id+"";
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
      res.send(apiResponse(results));
  });
});

function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

module.exports = teachers;