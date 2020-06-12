const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

module.exports = async function getRegistro (req, res){

    let connection;

    try {
        
        connection = await oracledb.getConnection(dbConfig);

        let g = req.query;
        
        const result = await connection.execute(
            // The statement to execute
            `SELECT
            r.folio,
            r.hora_registro hr,
            r.id_vehiculo idV,
            v.marca,
            v.modelo,
            ts.tipo_servicio ts
            FROM
            registro r
            INNER JOIN VEHICULO v ON v.placas = r.id_vehiculo
            INNER JOIN TARIFA t ON t.id_tarifa = r.id_tarifa
            INNER JOIN tipo_servicio ts ON ts.id_servicio = t.tipo_servicio_fk
            WHERE r.status = 'ACTIVO'
            ORDER BY r.hora_registro DESC`,
            [],
            {
              outFormat: oracledb.OBJECT
            });
            console.log(result.rows);
            res.send(result.rows);

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