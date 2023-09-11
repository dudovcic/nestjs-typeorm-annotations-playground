import { AnnotationEntity } from '../../entities/annotation.entity';
import { AnnotationResult } from '../types/annotation-result';

export const serializeAnnotation = (
  annotation: AnnotationEntity,
): AnnotationResult => ({
  id: annotation.id,
  comment: annotation.comment,
  startTime: annotation.startTime,
  endTime: annotation.endTime,
  notes: annotation.notes,
  videoId: annotation.videoEntityId,
});
