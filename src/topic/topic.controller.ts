import { Controller, Get, Res, Param, HttpStatus, Query, Options, UseGuards, Post, Body, Put, Delete } from '@nestjs/common';
import { TopicService } from './topic.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CreateTopicDTO } from './dto/create-topic.dto';

@Controller('topic')
@UseGuards(AuthGuard())
export class TopicController {
    constructor(private topicService: TopicService){
    }

    @Post()
    async addTopic(@Res() res: Response, @Body('data') createTopicDTO: CreateTopicDTO){
        this.topicService.addTopic(createTopicDTO)
        .then( Topic => {
            return res.status(HttpStatus.OK).json({
                ok:true,
                Topic
            })
        })
        .catch( err => {
            console.log(err);
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                err
            })
        })
        
    }

    @Get(':id')
    async getTopic(@Res() res, @Param('id') TopicID:string){
        this.topicService.getTopic(TopicID)
        .then( Topic => {
            return res.status(HttpStatus.OK).json({
                ok:true,
                Topic
            })
        })
        .catch( err => {
            console.log(err);
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                err
            })
        }) 
    }

    @Get()
    async getTopics(@Res() res: Response, @Query() options ){
        this.topicService.getAllTopic(options)
        .then( data => {
            return res.status(HttpStatus.OK).json({
                ok: true,
                items: data.all,
                total: data.total
            })
        })
        .catch( err => {
            console.log(err);
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                err
            })
        }) 
    }

    @Put(':id')
    async updateTopic(@Res() res, @Param('id') TopicID, @Body('data') createTopicDTO: CreateTopicDTO){
        this.topicService.updateTopic(TopicID, createTopicDTO)
        .then( Topic => {
            return res.status(HttpStatus.OK).json({
                ok:true,
                Topic
            })
        })
        .catch( err => {
            console.log(err);
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                err
            })
        })
    }

    @Put(':id/activate')
    async activeTopic(@Res() res, @Param('id') TopicID ){
        this.topicService.activeTopic(TopicID)
        .then( Topic => {
            return res.status(HttpStatus.OK).json({
                ok:true,
                Topic
            })
        })
        .catch( err => {
            console.log(err);
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                err
            })
        })
    }



    @Delete(':id')
    async deleteTopic(@Res() res, @Param('id') TopicID){
        this.topicService.deleteTopic(TopicID)
        .then( Topic => {
            return res.status(HttpStatus.OK).json({
                ok:true,
                Topic
            })
        })
        .catch( err => {
            console.log(err);
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                err
            })
        })
    }

}
