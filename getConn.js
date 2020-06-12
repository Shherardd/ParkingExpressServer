const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

module.exports = async function getConn (req, res){

    let connection;

    try {
        
        connection = await oracledb.getConnection(dbConfig);
        res.send('connected');

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