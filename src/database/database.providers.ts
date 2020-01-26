import * as mongoose from 'mongoose';
import { ConfigService } from '../config/config.service';
import mongooseFindAndFilter from '../utils/mongoose-find-and-filter';


export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: 'DATABASE_CONNECTION',
    useFactory: async (config: ConfigService): Promise<typeof mongoose> => {
      (mongoose as any).Promise = global.Promise;
      mongoose.set('debug', true);
      mongoose.plugin(mongooseFindAndFilter);
      return await mongoose.connect(`mongodb://${ config.get('DB_USER') }: ${ config.get('DB_PASSWORD') }@${config.get('DB_HOST')}:${config.get('DB_PORT')}/${config.get('DB_NAME')}`,
            {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true})}
      // await mongoose.connect('mongodb://localhost:27018/api_nest',{ useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
  }
];