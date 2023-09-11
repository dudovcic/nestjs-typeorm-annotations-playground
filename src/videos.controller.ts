import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ListVideosQuery } from './videos/list-videos/query/list-videos-query.handler';
import { VideoResult } from './videos/types/video-result';
import { AddVideoInput } from './videos/add-video/dtos/add-video.input';
import { AddVideoCommand } from './videos/add-video';
import { DeleteVideoCommand } from './videos/delete-video';

@Controller('/videos')
export class VideosController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get()
  async getVideos(): Promise<VideoResult[]> {
    return this.queryBus.execute(new ListVideosQuery());
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async addVideo(@Body() body: AddVideoInput): Promise<VideoResult> {
    return this.commandBus.execute(new AddVideoCommand(body));
  }

  @Delete('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteVideo(@Param('id') id: string): Promise<VideoResult> {
    return this.commandBus.execute(new DeleteVideoCommand(id));
  }
}
