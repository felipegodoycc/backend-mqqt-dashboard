import { Connection } from 'mongoose';
import { AuthTokenSchema } from './schema/token.schema';

export const authProviders = [
  {
    provide: 'AUTH_MODEL',
    useFactory: (connection: Connection) => connection.model('AuthToken', AuthTokenSchema, 'auth_tokens'),
    inject: ['DATABASE_CONNECTION'],
  },
];
