const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const conn = require("./db/conn");
const blogs = require("./routers/blogs");
app.use(bodyParser.json());
app.use(blogs);

function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});