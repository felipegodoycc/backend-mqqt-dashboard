import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { topicProviders } from './topic.providers';
import { PassportModule } from '@nestjs/passport';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'jwt', session: false})
    ],
    controllers: [TopicController],
    providers: [TopicService, ...topicProviders],
    exports: [TopicService]
})
export class TopicModule {}
