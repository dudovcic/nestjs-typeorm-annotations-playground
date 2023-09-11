import { TestBed } from '@automock/jest';

import {
  AddVideoCommand,
  AddVideoCommandHandler,
} from './add-video-command.handler';
import { VideosService } from '../../../video.service';
import { AddVideoInput } from '../dtos/add-video.input';
import { VideoEntity } from '../../../entities/video.entity';

describe('AddAnnotationCommandHandler', () => {
  let sut: AddVideoCommandHandler;

  let mockVideosService: jest.Mocked<VideosService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(AddVideoCommandHandler)
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
    const expectedRequestBody: AddVideoInput = {
      duration: 123333,
      url: 'http://url.co',
      provider: 'provider',
    };

    const video1 = new VideoEntity();
    video1.id = 'video-1';
    video1.duration = 123333;
    video1.url = 'http://url.co';
    video1.provider = 'provider';

    mockVideosService.addVideo.mockResolvedValue(video1);

    const res = await sut.execute(new AddVideoCommand(expectedRequestBody));

    expect(res).toEqual({
      id: 'video-1',
      duration: 123333,
      url: 'http://url.co',
      provider: 'provider',
    });
  });
});
