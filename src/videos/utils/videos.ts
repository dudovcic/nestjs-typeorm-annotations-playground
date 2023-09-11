import { VideoEntity } from '../../entities/video.entity';
import { VideoResult } from '../types/video-result';

export const serializeVideo = (annotation: VideoEntity): VideoResult => ({
  id: annotation.id,
  duration: annotation.duration,
  url: annotation.url,
  provider: annotation.provider,
});
