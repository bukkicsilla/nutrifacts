var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.set('Content-Type', 'application/json');
  next();
});

app.get('/nutrifacts', function (req, res) {
  // Open the existing notes file
  fs.readFile(__dirname + '/data/nutrifacts.json', 'utf8', function (err, data) {

    // If we get an error, log it and return
    if (err) {
      res.status(500).end();
      return console.log(err);
    }

    res.status(200).send(data);

  });
})

// Update a note
app.put('/nutrifacts/:id', function (req, res) {
  // Open the existing notes file
  fs.readFile(__dirname + '/data/nutrifacts.json', 'utf8', function (err, data) {

    // If we get an error, log it and return
    if (err) {
      res.status(500).end();
      return console.log(err);
    }

    // Try to parse the JSON or return
    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).end();
      return console.log(e);
    }

    // Add body item to notes array
    data.forEach(function (item, index) {
      if (item.id == req.params.id) {
        data[index] = req.body;
      }
    });

    // Write file back to server
    fs.writeFile(__dirname + '/data/nutrifacts.json', JSON.stringify(data), function (err) {

      // If we get an error, log it and return
      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      // No errors, everything is done so return new data
      res.status(200).send(data);
    });
  });
});

// Create a new note
app.post('/nutrifacts', function (req, res) {
  // Open the existing notes file
  fs.readFile(__dirname + '/data/nutrifacts.json', 'utf8', function (err, data) {

    // If we get an error, log it and return
    if (err) {
      res.status(500).end();
      return console.log(err);
    }

    // Try to parse the JSON or return
    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).end();
      return console.log(e);
    }

    // Add body item to notes array
    data.push(req.body);

    // Write file back to server
    fs.writeFile(__dirname + '/data/nutrifacts.json', JSON.stringify(data), function (err) {

      // If we get an error, log it and return
      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      // No errors, everything is done so return new data
      res.status(201).send(data);
    });
  });
});

// Delete a note
app.delete('/nutrifacts/:id', function (req, res) {
  // Open the existing notes file
  fs.readFile(__dirname + '/data/nutrifacts.json', 'utf8', function (err, data) {

    // If we get an error, log it and return
    if (err) {
      res.status(500).end();
      return console.log(err);
    }

    // Try to parse the JSON or return
    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).end();
      return console.log(e);
    }

    // Add body item to notes array
    var index = -1;
    data.forEach(function (item, i) {
      if (item.id == req.params.id) {
        index = i;
      }
    });

    // If we found an item by that id, remove it
    if (index >= 0) {
      data.splice(index, 1);
    }

    // Write file back to server
    fs.writeFile(__dirname + '/data/nutrifacts.json', JSON.stringify(data), function (err) {

      // If we get an error, log it and return
      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      // No errors, everything is done so return
      res.status(204).end();
    });
  });
});



/*app.listen(3000, function () {
  console.log('Server started. Open http://localhost:3000 in your browser.');
});*/

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
