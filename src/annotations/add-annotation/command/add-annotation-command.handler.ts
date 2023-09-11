import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

// TODO: update
import { AddAnnotationInput } from '../dtos/add-annotation.input';
import { AnnotationsService } from '../../../annotations.service';
import { AnnotationResult } from '../../types/annotation-result';
import { serializeAnnotation } from '../../utils/annotations';
import { VideosService } from '../../../video.service';

export class AddAnnotationCommand {
  constructor(readonly input: AddAnnotationInput) {}
}

@CommandHandler(AddAnnotationCommand)
export class AddAnnotationCommandHandler
  implements ICommandHandler<AddAnnotationCommand>
{
  constructor(
    private annotationsService: AnnotationsService,
    private videosService: VideosService,
  ) {}

  async execute({ input }: AddAnnotationCommand): Promise<AnnotationResult> {
    const data = {
      comment: input.comment,
      startTime: input.startTime,
      videoId: input.videoId,
      endTime: input.endTime,
      notes: input.notes,
      type: input.type,
    };

    const annotation = await this.annotationsService.addAnnotation(data);

    return Promise.resolve(serializeAnnotation(annotation));
  }
}
