const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

module.exports = async function registro (req, res){

    let connection;
    let today = new Date;
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = "'"+date+" "+time+"'";
    let dateTime2 = date+" "+time;


    try {
        connection = await oracledb.getConnection(dbConfig);
        let k = req.body;
        res.send(k);

        

        console.log(req.body);

        if(req.body.isNew == 'false'){
            let crearVehiculo = await connection.execute(
                `INSERT INTO VEHICULO (PLACAS, MODELO, MARCA) 
                VALUES (:Placas, :Modelo, :Marca)`,
                {Placas: k.PLACAS, Modelo: k.MODELO, Marca: k.MARCA},
                {autoCommit: true}
            );
            console.log(crearVehiculo.rowsAffected);
        }

        let insertTarifa = await connection.execute(
            `INSERT INTO TARIFA (TIPO_VEHICULO_FK, TIPO_SERVICIO_FK, COSTO_HORA) 
            VALUES (:TipoV, :TipoS, :Costo)`,
            {TipoV: k.ID_TIPO, TipoS: k.ID_SERVICIO, Costo: k.tarifa},
            {autoCommit: true}
        );
        console.log("Rows inserted: " + insertTarifa.rowsAffected);

        let selectLast = await connection.execute(
            `SELECT max(ID_TARIFA) lastId from TARIFA`,
            [],
            {outFormat: oracledb.string}
        );
        
        let lastId = selectLast.rows.toString();
        lastId.replace('[','')
        console.log(lastId);

        date = new Date();
        let result = await connection.execute(
            `INSERT INTO REGISTRO (HORA_REGISTRO, STATUS, ID_VEHICULO, ID_EMPLEADO, ID_TARIFA)
             VALUES (:HR, :ST, :IV, :IE, :IT)`,
            { HR: date, ST: k.ESTADO, IV: k.PLACAS, IE: 1, IT: lastId },
            {autoCommit: true}
            );

          console.log("Rows inserted: " + result.rowsAffected);  // 1
          console.log("ROWID of new row: " + result.lastRowid);


        

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