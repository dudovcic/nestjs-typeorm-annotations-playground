import { TestBed } from '@automock/jest';

import {
  AddAnnotationCommand,
  AddAnnotationCommandHandler,
} from './add-annotation-command.handler';
import { AnnotationsService } from '../../../annotations.service';
import { AddAnnotationInput } from '../dtos/add-annotation.input';
import { AnnotationEntity } from '../../../entities/annotation.entity';
import { VideoEntity } from '../../../entities/video.entity';

describe('AddAnnotationCommandHandler', () => {
  let sut: AddAnnotationCommandHandler;

  let mockAnnotationsService: jest.Mocked<AnnotationsService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(AddAnnotationCommandHandler)
      .mock(AnnotationsService)
      .using(mockAnnotationsService)
      .compile();

    sut = unit;

    mockAnnotationsService = unitRef.get(AnnotationsService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return successful response', async () => {
    const expectedRequestBody: AddAnnotationInput = {
      comment: 'Comment',
      startTime: 123,
      endTime: 333,
      notes: 'A note',
      videoId: 'video-id',
      type: 'type',
    };

    const annotation1 = new AnnotationEntity();
    annotation1.id = 'id-1';
    annotation1.comment = 'Comment';
    annotation1.startTime = 123;
    annotation1.endTime = 333;
    annotation1.notes = 'A note';

    const video = new VideoEntity();
    video.id = 'video-id';

    annotation1.videoEntityId = video.id;
    annotation1.videoEntity = video;

    mockAnnotationsService.addAnnotation.mockResolvedValue(annotation1);

    const res = await sut.execute(
      new AddAnnotationCommand(expectedRequestBody),
    );

    expect(res).toEqual({
      id: 'id-1',
      comment: 'Comment',
      startTime: 123,
      endTime: 333,
      notes: 'A note',
      videoId: 'video-id',
    });
  });
});
