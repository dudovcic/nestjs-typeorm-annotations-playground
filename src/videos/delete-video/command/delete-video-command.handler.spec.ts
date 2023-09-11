import { TestBed } from '@automock/jest';

import {
  DeleteVideoCommand,
  DeleteVideoCommandHandler,
} from './delete-video-command.handler';
import { VideosService } from '../../../video.service';

describe('DeleteVideoCommandHandler', () => {
  let sut: DeleteVideoCommandHandler;

  let mockVideoService: jest.Mocked<VideosService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(DeleteVideoCommandHandler)
      .mock(VideosService)
      .using(mockVideoService)
      .compile();

    sut = unit;

    mockVideoService = unitRef.get(VideosService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return successful response', async () => {
    mockVideoService.deleteVideo.mockResolvedValue(true);

    const res = await sut.execute(new DeleteVideoCommand('video-id'));

    expect(res).toEqual({ success: true });
  });
});
