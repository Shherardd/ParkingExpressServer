const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

module.exports = async function getTarifa (req, res){

    let connection;

    try {
        
        connection = await oracledb.getConnection(dbConfig);

        let g = req.query;
        
        const result = await connection.execute(
            `SELECT tv.factor_multiplicador * ts.costo tarifa
            FROM tipo_vehiculo tv
            INNER JOIN tipo_servicio ts
            ON tv.id_tipo = ${g.idV} and ts.id_servicio =${g.idS}`,
            [],
      
            
            {
              outFormat: oracledb.OUT_FORMAT_ARRAY  
            });
            let cut = result.rows.toString();
            cut.replace('[', '');
            res.send(cut);

    } catch (err) {
        console.log(err);
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