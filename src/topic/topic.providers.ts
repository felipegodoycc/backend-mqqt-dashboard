import { Connection } from 'mongoose';
import { TopicSchema } from './schemas/topic.schema';

export const topicProviders =[
    {
        provide: 'TOPIC_MODEL',
        useFactory: (connection: Connection) => connection.model('Topic', TopicSchema, 'topics_mqtt'),
        inject: ['DATABASE_CONNECTION']
    }
]