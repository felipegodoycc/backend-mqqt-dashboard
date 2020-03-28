import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Topic } from 'aws-sdk/clients/iot';
import { CreateTopicDTO } from './dto/create-topic.dto';

@Injectable()
export class TopicService {
    constructor(
        @Inject('TOPIC_MODEL') private readonly topicModel) {}
        
    async addTopic(createTopicDTO: CreateTopicDTO): Promise<Topic> {
        const newTopic = new this.topicModel(createTopicDTO);
        await newTopic.save();
        return newTopic;
    }
    async getAllTopic(options: Object) {
        const all = await this.topicModel.findAndFilter({}, options, []);
        let total = await this.topicModel.findAndFilter({}, options, [], false);
        total = total.length;
        return { all, total };
    }

    async getTopic(topicID: any): Promise<Topic> {
        const topic = await this.topicModel.findById(topicID)
                                    .exec();
        if (!topic) { throw new NotFoundException('Topico no encontrado'); }
        return topic;
    }

    async updateTopic(topicID: any, createTopicDTO: CreateTopicDTO): Promise<Topic> {
        const updateTopic = await this.topicModel
            .findByIdAndUpdate(topicID, createTopicDTO, { new: true, context: 'query' });
        if (!updateTopic) { throw new NotFoundException('Topico no encontrado'); }
        return updateTopic;
    }

    async deleteTopic(topicID: any): Promise<Topic> {
        const deletedTopic = await this.topicModel.findByIdAndUpdate(topicID, { active: false}, {new: true});
        if (!deletedTopic) { throw new NotFoundException('Topico no encontrado'); }
        return deletedTopic;
    }

    async activeTopic(topicID: any): Promise<Topic> {
        const activeTopic = await this.topicModel.findByIdAndUpdate(topicID, { active: true }, { new: true });
        if (!activeTopic) { throw new NotFoundException('Topico no encontrado'); }
        return activeTopic;
    }


    
}
