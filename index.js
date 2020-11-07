'use strict';

const bodyParser = require('body-parser');
const file = './dto.json';
const fs = require('fs'),
  express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

const controllers = {
  get: (req, res) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) throw err;
      res.send(data || [])
    });
  },
  post: (req, res) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) throw err;

      const content = JSON.parse(data);
      content.push(req.body);

      fs.writeFile(file, JSON.stringify(content), () => {
        res.send(req.body);
      });
    });
  }
}

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.route('/dtos')
  .get(controllers.get)
  .post(controllers.post)

app.listen(port);

console.log('API server started on: ' + port);