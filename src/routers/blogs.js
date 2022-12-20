const express = require("express");
const blogs = new express.Router();
const conn = require("../db/conn");


blogs.get('/api/blogs',(req, res) => {
  let sqlQuery = "SELECT title,description FROM blog";
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
blogs.get('/api/blogs/:id',(req, res) => {
  let sqlQuery = "SELECT title,description FROM blog WHERE id=" + req.params.id;
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});

blogs.post('/api/blogs',(req, res) => {
  let data = {title: req.body.title, description: req.body.description};
  let sqlQuery = "INSERT INTO blog SET ?";
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
blogs.put('/api/blogs/:id',(req, res) => {
  let sqlQuery = "UPDATE blog SET title='"+req.body.title+"', description='"+req.body.description+"' WHERE id="+req.params.id;
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   

blogs.delete('/api/blogs/:id',(req, res) => {
  let sqlQuery = "DELETE FROM blog WHERE id="+req.params.id+"";
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
      res.send(apiResponse(results));
  });
});

function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

module.exports = blogs;