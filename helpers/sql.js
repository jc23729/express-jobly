/**
 * Generate a selective update query based on a request body:
 *
 * - table: where to make the query
 * - items: an object with keys of columns you want to update and values with updated values
 * - key: the column that we query by (e.g. username, handle, id)
 * - id: current record ID
 *
 * Returns object containing a DB query as a string, and array of
 * string values to be updated
 *
 */

function sqlForPartialUpdate(table, items, key, id) {
  // keep track of items indexes
  //store all the columns we want to update and associated valuesIn

  let idx = -1;
  let columns = [];

  // filter out keys that start with "_" (=> "_token") -- we don't want these in DB
  for (let key in items) {
    if (key.startsWith("_")) {
      delete items[key];
    }
  }
}

//Origonal code
// const { BadRequestError } = require("../expressError");

// // THIS NEEDS SOME GREAT DOCUMENTATION.

// function sqlForPartialUpdate(dataToUpdate, jsToSql) {
//   const keys = Object.keys(dataToUpdate);
//   if (keys.length === 0) throw new BadRequestError("No data");

//   // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
//   const cols = keys.map((colName, idx) =>
//       `"${jsToSql[colName] || colName}"=$${idx + 1}`,
//   );

//   return {
//     setCols: cols.join(", "),
//     values: Object.values(dataToUpdate),
//   };
// }

// module.exports = { sqlForPartialUpdate };
