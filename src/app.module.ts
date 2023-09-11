import { Module } from '@nestjs/common';
import { AnnotationsController } from './annotations.controller';
import { AnnotationsService } from './annotations.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { AddAnnotationCommandHandler } from './annotations/add-annotation';
import { ListAnnotationsCommandHandler } from './annotations/list-annotations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnotationEntity } from './entities/annotation.entity';
import { VideoEntity } from './entities/video.entity';
import { VideosService } from './video.service';
import { VideosController } from './videos.controller';
import { ListVideosQueryHandler } from './videos/list-videos';
import { AddVideoCommandHandler } from './videos/add-video';
import { DeleteVideoCommandHandler } from './videos/delete-video';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('database'),
    }),
    TypeOrmModule.forFeature([AnnotationEntity, VideoEntity]),
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [VideosController, AnnotationsController],
  providers: [
    AnnotationsService,
    VideosService,
    DeleteVideoCommandHandler,
    ListVideosQueryHandler,
    AddVideoCommandHandler,
    ListAnnotationsCommandHandler,
    AddAnnotationCommandHandler,
  ],
})
export class AppModule {}
