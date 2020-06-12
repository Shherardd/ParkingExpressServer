const express = require("express");
const getSelect = require('./getSelect');
const getTarifa = require('./getTarifa');
const registro = require('./registro');
const getRegistro = require('./getRegistro');
const multer = require('multer');
const upload = multer();
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(upload.array());
app.use(express.static('public'));

 

app.get('/api/customers', (req, res) =>{
    const customers =[
        {id : 1, firstName: 'John', lastName: 'Doe'},
        {id : 2, firstName: 'Steve', lastName: 'Smith'},
        {id : 3, firstName: 'Mary', lastName: 'Swanson'}
    ];

    res.json(customers);
});

app.get('/getVehiculos', getSelect);

app.get('/getTarifa', getTarifa)

app.post('/registro', registro);

app.get('/getRegistro', getRegistro);

const port = 5000;

app.listen(port, () => console.log(`Servidor iniciado en localhost:${port}`));