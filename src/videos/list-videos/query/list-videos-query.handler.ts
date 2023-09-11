import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { serializeVideo } from '../../utils/videos';
import { VideosService } from '../../../video.service';
import { VideoResult } from '../../types/video-result';

export class ListVideosQuery {}

@QueryHandler(ListVideosQuery)
export class ListVideosQueryHandler implements IQueryHandler<ListVideosQuery> {
  constructor(private videosService: VideosService) {}

  async execute({}: ListVideosQuery): Promise<VideoResult[]> {
    const videos = await this.videosService.getVideos();

    return Promise.resolve(videos.map((video) => serializeVideo(video)));
  }
}
