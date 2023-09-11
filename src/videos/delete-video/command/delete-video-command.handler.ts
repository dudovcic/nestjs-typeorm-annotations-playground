import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { VideosService } from '../../../video.service';

export class DeleteVideoCommand {
  constructor(readonly id: string) {}
}

@CommandHandler(DeleteVideoCommand)
export class DeleteVideoCommandHandler
  implements ICommandHandler<DeleteVideoCommand>
{
  constructor(private videosService: VideosService) {}

  async execute({ id }: DeleteVideoCommand): Promise<{ success: true }> {
    await this.videosService.deleteVideo(id);

    return Promise.resolve({ success: true });
  }
}
