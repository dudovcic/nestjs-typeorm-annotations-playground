import { AnnotationEntity } from './annotation.entity';
import BaseEntity from './base.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class VideoEntity extends BaseEntity {
  @Column({})
  duration: number;

  @Column({})
  url: string;

  @Column()
  provider: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => AnnotationEntity, (ant) => ant.videoEntity)
  annotationEntity: AnnotationEntity;
}
