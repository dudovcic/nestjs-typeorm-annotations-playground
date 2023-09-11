import BaseEntity from './base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { VideoEntity } from './video.entity';

@Entity()
export class AnnotationEntity extends BaseEntity {
  @Column({})
  comment: string;

  @Column({})
  startTime: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => VideoEntity, (video) => video.annotationEntity)
  @JoinColumn()
  videoEntity: VideoEntity;

  @Column()
  videoEntityId: string;

  @Column({})
  endTime: number;

  @Column({})
  type: string;

  @Column({ nullable: true })
  notes: string;
}
