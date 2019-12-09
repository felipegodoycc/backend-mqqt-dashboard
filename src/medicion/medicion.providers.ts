import { Connection } from 'mongoose';
import { MedicionSchema } from './schemas/medicion.schema';

export const medicionProviders =[
    {
        provide: 'MEDICION_MODEL',
        useFactory: (connection: Connection) => connection.model('Log', MedicionSchema, 'logs'),
        inject: ['DATABASE_CONNECTION']
    }
]