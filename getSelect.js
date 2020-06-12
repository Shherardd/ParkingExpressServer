
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

module.exports = async function getConn (req, res){

    let connection;

    try {
        
        connection = await oracledb.getConnection(dbConfig);
        console.log(req.query.tabla);
        console.log(req.query.columna);
        console.log(req.query.id);
        /*const customers =[
            {id : 1, firstName: 'Jonas', lastName: 'Doe'},
            {id : 2, firstName: 'Steve', lastName: 'Smith'},
            {id : 3, firstName: 'Mary', lastName: 'Swanson'}
        ];
        res.json(customers);*/
        const result = await connection.execute(
            // The statement to execute
            `SELECT ${req.query.id} as ID, ${req.query.columna} as DES
             FROM ${req.query.tabla}
             `,[],
      
            // The "bind value" 3 for the bind variable ":idbv"
            
      
            // Options argument.  Since the query only returns one
            // row, we can optimize memory usage by reducing the default
            // maxRows value.  For the complete list of other options see
            // the documentation.
            {
              outFormat: oracledb.OBJECT  // query result format
              //, extendedMetaData: true                 // get extra metadata
              //, fetchArraySize: 100                    // internal buffer allocation size for tuning
            });
            res.send(result.rows);
        //res.json(result);
        //res.send('connected');

    } catch (err) {

        res.send(err);

    } finally {

        if (connection) {
        try {
            await connection.close();
        }
        catch (err) {
                res.send(err);
        }
        }
    }
}