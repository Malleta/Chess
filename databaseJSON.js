var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'rafchess123Maleta',
    database : 'database'
});

connection.connect();

connection.query('SELECT * from chess_schema.registration_table', function(err, rows, fields) {
    if (!err)
        console.log('The solution is: ', rows);
    else
        console.log('Error while performing Query.');
});

connection.end();