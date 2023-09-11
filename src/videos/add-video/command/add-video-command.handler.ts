import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

// TODO: update
import { AddVideoInput } from '../dtos/add-video.input';
import { VideosService } from '../../../video.service';
import { serializeVideo } from '../../utils/videos';
import { VideoResult } from '../../types/video-result';

export class AddVideoCommand {
  constructor(readonly input: AddVideoInput) {}
}

@CommandHandler(AddVideoCommand)
export class AddVideoCommandHandler
  implements ICommandHandler<AddVideoCommand>
{
  constructor(private videosService: VideosService) {}

  async execute({ input }: AddVideoCommand): Promise<VideoResult> {
    const data = {
      duration: input.duration,
      url: input.url,
      provider: input.provider,
    };

    const video = await this.videosService.addVideo(data);

    return Promise.resolve(serializeVideo(video));
  }
}
