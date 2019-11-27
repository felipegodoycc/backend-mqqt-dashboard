
/*

Plugin para mongoose para :

- Filtrar
- Ordenar
- Habilitar populate
- Paginar

    *
     *
     * @param {*} query ingresa query por defecto
     * @param {*} queryParams recibe el objecto de @Query entregado por Nest 
     * @param {*} populate recibe parametros a realizar populate
     * @param {*} cb callback
     * @returns callback o promesa con los datos requeridos
*/
let booleanos = ['true', 'false']

export default function (schema) {
    // Utilizamos la hermosa libreria lodash <3
    const _ = require('lodash');
    
    schema.statics.findAndFilter = async function (query, queryParams, populate, options = true, cb){
  
        var ObjectId = require('mongoose').Types.ObjectId;
        // Se reciben parametros o establecen por default
        query = query || {};
        queryParams = queryParams || {};
        let queryOptions:any = {};

        // Se obtienen las keys del objeto modelo
        let schemaKeys= Object.keys(schema.paths)

        // Se omiten parametros innecesarios para el query
        let filter = _.omit(queryParams, ['page', 'skip','limit','populate','sort'])
        let fix_filter = {};

        // Se recorren parametros restantes, clasificando en booleano, id's y string normales se convierten a regex
        await Object.keys(filter).forEach( key => {
            let val = filter[key];
            let s = val.split(',');
            console.log('object? ', ObjectId.isValid(val));
            if( key.includes('tipo') && s.length < 1) return fix_filter[key] = val;
            if( s.length >= 2){ return fix_filter[key] = { $in: s } }       
            if(ObjectId.isValid(val) || booleanos.includes(val)) return fix_filter[key] = val;
            
            return fix_filter[key] = { $regex: `^${val}`, $options: 'i' }
        })

        // Desde el queryParams original se extraen parametros para mongodb
        // Limite por pagina
        let _limit = parseInt(_.get(queryParams, 'limit', 20)) 
        // Pagina a leer
        let _page = parseInt(_.get(queryParams, 'page', 1)) 
        // Campo para ordenamiento
        let _sort = _.get(queryParams, 'sort');
        // Campo para populate 
        let _populate = Boolean(_.get(queryParams, 'populate'));

        // Se construye json con las opciones de consulta para mongodb
        if(_limit == -1 && _page == -1){
            queryOptions = {
                sort: {}
            }
        } else {
            queryOptions = {
                limit: _limit,
                skip: (_page-1)*_limit,
                sort: { } 
            }
        }
        
        // Si existe el parametro sort, se realiza split para cargar al queryoptions
        if(_sort) _sort = _sort.split(':');
        // Si existe y contiene dos parametros, se parsean y carga al json
        if(_sort && _sort.length == 2) {
            _sort = JSON.parse(`{"${_sort[0]}":"${_sort[1]}"}`);
            queryOptions = _.assign({}, queryOptions, { sort: _sort});
        }
        // Si existe el parametro populate true, se intrega a las queryOption
        if(_populate) queryOptions = _.assign({}, queryOptions, { populate: populate })        
        
        // Se combina la query por default con las query recibida por queryParams
        query = _.assign({}, query, fix_filter);
        
        if(!options) queryOptions = {}
        
        console.log(`[FindAndFilter] => query: ${JSON.stringify(query)} options: ${JSON.stringify(queryOptions)} `);
        
        return this.find(query,{}, queryOptions)
            .then((result: any) => {
                // console.log('result', result)
                if (cb) return cb(null, result);
                return result;
            })
            .catch((err: any) => {
                if (cb) return cb({ message: err, status: 400 }, null);
                return { message: err, status: 400 };
        }); 
    };
};