import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AnnotationsService } from '../../../annotations.service';
import { serializeAnnotation } from '../../utils/annotations';
import { AnnotationResult } from '../../types/annotation-result';

export class ListAnnotationsCommand {}

@CommandHandler(ListAnnotationsCommand)
export class ListAnnotationsCommandHandler
  implements ICommandHandler<ListAnnotationsCommand>
{
  constructor(private annotationsService: AnnotationsService) {}

  async execute({}: ListAnnotationsCommand): Promise<AnnotationResult[]> {
    const annotations = await this.annotationsService.getAnnotations();

    return Promise.resolve(
      annotations.map((annotation) => serializeAnnotation(annotation)),
    );
  }
}
