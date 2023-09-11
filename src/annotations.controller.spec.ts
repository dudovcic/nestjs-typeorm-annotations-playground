import { Test, TestingModule } from '@nestjs/testing';
import { AnnotationsController } from './annotations.controller';
import { AnnotationsService } from './annotations.service';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { AnnotationEntity } from './entities/annotation.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';

describe('AnnotationsController', () => {
  let ac: AnnotationsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        CqrsModule,
        ConfigModule.forRoot({
          envFilePath: [`.env`],
          isGlobal: true,
          load: [config],
        }),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) =>
            configService.get('database'),
        }),
      ],
      controllers: [AnnotationsController],
      providers: [
        AnnotationsService,
        { provide: getRepositoryToken(AnnotationEntity), useValue: jest.fn() },
      ],
    }).compile();

    ac = app.get<AnnotationsController>(AnnotationsController);
  });

  it('should be defined', () => {
    expect(ac).toBeDefined();
  });
});
