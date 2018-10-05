//mysql connect info
var connection = require("../config/connection.js");

//to put ? into query for the sql variables
function thisIsCrazy(num) {

  const holdDatQArr = [];

  for (var i = 0; i < num; i++) {
    holdDatQArr.push("?");
    console.log(holdDatQArr);
  }

  return holdDatQArr.toString();
}

// turning object data into mysql
function convertObjSql(obj) {

  var convertedArr = [];

  // loop through the keys and push the key/value into array as sql
  for (var key in obj) {

    if (Object.hasOwnProperty.call(obj, key)) {
      var value = obj[key];

      // quotes if spaces in string
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }

      convertedArr.push(key + "=" + value);
    }
  }

   //array to string method
  return convertedArr.toString();
}

//orm sql query methods
var orm = {
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += thisIsCrazy(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {throw err;}
      cb(result);
    });
  },
  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += convertObjSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {throw err;}
      cb(result);
    });
  }
};

// Export orm for models/burger.js
module.exports = orm;
