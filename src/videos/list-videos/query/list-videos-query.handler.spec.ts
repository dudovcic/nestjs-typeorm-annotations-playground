import { TestBed } from '@automock/jest';

import {
  ListVideosQuery,
  ListVideosQueryHandler,
} from './list-videos-query.handler';
import { VideosService } from '../../../video.service';
import { AnnotationEntity } from '../../../entities/annotation.entity';

describe('ListVideosQueryHandler', () => {
  let sut: ListVideosQueryHandler;

  let mockVideosService: jest.Mocked<VideosService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(ListVideosQueryHandler)
      .mock(VideosService)
      .using(mockVideosService)
      .compile();

    sut = unit;

    mockVideosService = unitRef.get(VideosService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return successful response', async () => {
    mockVideosService.getVideos.mockResolvedValue([
      {
        id: 'video-id',
        duration: 3333111,
        provider: 'vimeo',
        url: 'http://mock.com/video',
        created: new Date(),
        updated: null,
        annotationEntity: new AnnotationEntity(),
      },
    ]);

    const res = await sut.execute(new ListVideosQuery());

    expect(res).toEqual([
      {
        id: 'video-id',
        duration: 3333111,
        provider: 'vimeo',
        url: 'http://mock.com/video',
      },
    ]);
  });
});
