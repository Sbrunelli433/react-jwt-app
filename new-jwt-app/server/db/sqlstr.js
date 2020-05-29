module.exports.new = function(table, required, obj, optional) {
  // takes a table name (string), an array of required column strings,
  // and a JSON request body object. 
  // optional last argument is an array of optional columns.
  //
  // returns an object with property 'valid' as a boolean, 'query' as a string
  // and 'entries' as an array to be used with mysql request
  var valid = true;
  var valArr = [];
  for (var i = 0; i < required.length; i++) {
    if (!obj[required[i]]) {
      valid = false;
      break;
    }
    valArr.push(obj[required[i]]);
  }
  if (valid) {
    var cols = required.slice();
    if (optional !== undefined) {
      for (var i = 0; i < optional.length; i++) {
        if (obj[optional[i]] !== undefined) {
          cols.push(optional[i]);
          valArr.push(obj[optional[i]]);
        }
      }
    }
    return {valid: true,
            entries: valArr,
            query: `INSERT INTO ${table} (
            ${cols.join(', ')}) VALUES (
            ${cols.map(() => '?').join(', ')});`}
  } else {
    return {valid: false}
  }
}

module.exports.update = function(table, id, modifiable, obj) {
  // takes a table name as string, id as a string of a column name for 
  // targeting row and validating request, modifiable which is an array of
  // modifiable column names, and obj which is a JSON request body object.
  
  if (!obj[id]) {
    return {valid: false}
  } else {
    var modify = [];
    var values = [];
    for (var i = 0; i < modifiable.length; i++) {
      if (obj[modifiable[i]]) {
        modify.push(modifiable[i] + ' = ?');
        values.push(obj[modifiable[i]]);
      }
    }
    var queryString = `UPDATE ${table} SET `;
    queryString += modify.join(', ');
    queryString += `, last_modified = CURRENT_TIMESTAMP`;
    queryString += ` WHERE ${id} = ?;`;
    values.push(obj[id]);
    return {
      valid: true,
      entries: values,
      query: queryString
    };
  }
}

module.exports.delete = function(table, id, obj) {
  // id is column for identification of row to be deleted
  if (!obj[id]) {
    return {valid: false};
  } else {
    var query = `DELETE FROM ${table} WHERE ${id}=?;`;
    return {
      valid: true,
      entries: obj[id],
      query: query
    }
  }
};