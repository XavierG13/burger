// Imports Mysql connection
var connection = require("../config/connection.js");

// Loops through and creates an array of questions marks - ["?", "?", "?"] - and turns it into a string
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Converts object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }

      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

var orm = {

  // Selects all burgers from the database
  all: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";

    connection.query(queryString, function (err, results) {
      if (err) throw err;

      cb(results);
    });
  },

  // Will create a new burger for db once user has input info
  create: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += "(";
    queryString += cols.toString();
    queryString += ")";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ")";

    console.log(queryString);

    connection.query(queryString, vals, function (err, results) {
      if (err) throw err;
      cb(results);
    });
  },

  // When user chooses to eat burger this will move burger to devoured section of page
  update: function (table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    
    connection.query(queryString, function (err, results) {
      if (err) throw err;

      cb(results);
    });
  },

  // If user wishes to delete a burger they can after it has been devoured
  delete: function (table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function (err, results) {
      if (err) throw err;

      cb(results);
    });
  },
};

module.exports = orm;
