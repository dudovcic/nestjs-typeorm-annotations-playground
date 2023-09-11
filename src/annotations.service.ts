import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnotationEntity } from './entities/annotation.entity';
import { VideoEntity } from './entities/video.entity';

@Injectable()
export class AnnotationsService {
  constructor(
    @InjectRepository(AnnotationEntity)
    private annotationsRepository: Repository<AnnotationEntity>,
  ) {}
  async getAnnotations(): Promise<AnnotationEntity[]> {
    return this.annotationsRepository.find({
      relations: { videoEntity: true },
    });
  }
  async addAnnotation(
    data: Pick<
      AnnotationEntity,
      'comment' | 'startTime' | 'endTime' | 'notes' | 'type'
    > & { videoId: string },
  ): Promise<AnnotationEntity> {
    const annotation = new AnnotationEntity();

    annotation.comment = data.comment;
    annotation.videoEntity = { id: data.videoId } as VideoEntity;
    annotation.startTime = data.startTime;
    annotation.endTime = data.endTime;
    annotation.notes = data.notes;
    annotation.type = data.type;
    annotation.type = data.type;

    return this.annotationsRepository.save(annotation);
  }
}
