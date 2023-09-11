import { TestBed } from '@automock/jest';

import {
  ListAnnotationsCommand,
  ListAnnotationsCommandHandler,
} from './list-annotations-command.handler';
import { AnnotationsService } from '../../../annotations.service';
import { VideoEntity } from '../../../entities/video.entity';

describe('SignupCommandHandler', () => {
  let sut: ListAnnotationsCommandHandler;

  let mockAnnotationsService: jest.Mocked<AnnotationsService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(ListAnnotationsCommandHandler)
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
    mockAnnotationsService.getAnnotations.mockResolvedValue([
      {
        id: 'annotation-id',
        comment: 'Comment',
        startTime: 22,
        endTime: 40,
        notes: 'A note',
        type: 'Annotation type',
        created: new Date(),
        updated: null,
        videoEntityId: 'video-id',
        videoEntity: new VideoEntity(),
      },
    ]);

    const res = await sut.execute(new ListAnnotationsCommand());

    expect(res).toEqual([
      {
        id: 'annotation-id',
        comment: 'Comment',
        endTime: 40,
        notes: 'A note',
        startTime: 22,
        videoId: 'video-id',
      },
    ]);
  });
});
