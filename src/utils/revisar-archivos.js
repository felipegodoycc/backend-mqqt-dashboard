const mongoose = require('mongoose')
const _ = require('lodash');

const Schema = mongoose.Schema;

const FileSchema = new Schema({
    bucket: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    url_s3: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    empresa: {
        type: mongoose.Types.ObjectId,
        ref: 'Empresa'
    },
    contrato: {
        type: mongoose.Types.ObjectId,
        ref: 'Contrato'
    },
    solicitud: {
        type: mongoose.Types.ObjectId,
        ref: 'Solicitud'
    },
    active: {
        type: Boolean,
        default: true
    },
    tipoDoc:{
        type: mongoose.Types.ObjectId,
        ref: 'Tipo Documento'
    },
    vencimiento:{
        type: Date
    },
    size: {
        type: Number
    },
    alerta: {
        type: Boolean,
        default: false
    },
    dias_vencimiento: {
        type: Number
    }
}, {timestamps:{createdAt: 'created',updatedAt: 'updated'}});

const mongo_uri = `mongodb://192.168.9.10:27018/api_nest`

mongoose.connect(mongo_uri, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});

mongoose.connection.on('error', function(error) {
  logger.error(mongo_uri)
  logger.error(error);
});

mongoose.connection.once('open', async function() {
    
    new Promise( async (resolve,reject) => {
        console.log('Database connected');
        let tareas = [];
        const Files = mongoose.model('Files', FileSchema, 'gen_files');

        console.log('Calculando dias')
        console.time('Tiempo Aggregate')
        await Files.aggregate([
            { $match: { vencimiento: { $ne: null } } },
            { $set: { 
                dias_vencimiento:{ $round: [{$divide: [{ $subtract: ["$vencimiento", { $dateFromParts:{year:{$year: new Date()},month:{$month:new Date()},day:{$dayOfMonth:new Date()}}}] },86400000]},0]}
                }
            },
            { $out: "temp_files" }
        ])
        console.timeEnd('Tiempo Aggregate')

        console.log('Obteniendo dias de tabla temporal')
        mongoose.connection.db.collection('temp_files', async function(err, collection){
            if (err) {
                console.log("error", err);
                return reject(err);
            }

            let temp = await collection.find({}).toArray();
    
            console.log('Archivos con fecha de vencimiento: ', temp.length)
    
            let total = await Files.find({})
    
            console.log('Total archivos: ', total.length);
    
            _.forEach(temp, async item => {
                item = _.omit(item, ['created','updated'])
                tareas.push(Files.findByIdAndUpdate(item._id, item));
            })

            resolve(await Promise.all(tareas))
        })        
    })
    .then( _ => {
        console.log("Cerrando conexion");
        mongoose.connection.close();
    })
    
});