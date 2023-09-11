import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoEntity } from './entities/video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoEntity)
    private videosRepository: Repository<VideoEntity>,
  ) {}
  async findOneById(id: VideoEntity['id']): Promise<VideoEntity> {
    return this.videosRepository.findOne({ where: { id } });
  }
  async getVideos(): Promise<VideoEntity[]> {
    return this.videosRepository.find({
      relations: { annotationEntity: true },
    });
  }
  async addVideo(
    data: Pick<VideoEntity, 'provider' | 'duration' | 'url'>,
  ): Promise<VideoEntity> {
    const video = new VideoEntity();

    video.duration = data.duration;
    video.provider = data.provider;
    video.url = data.url;

    return this.videosRepository.save(video);
  }
  async deleteVideo(id: VideoEntity['id']): Promise<boolean> {
    const videoExists = await this.videosRepository.exist({ where: { id } });

    if (!videoExists) {
      throw new NotFoundException('Video not found');
    }

    await this.videosRepository.delete({ id });

    return true;
  }
}
