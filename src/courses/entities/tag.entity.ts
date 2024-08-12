import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { randomUUID } from 'crypto';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @ManyToMany(() => Course, (course) => course.tags)
  course: Course[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert()
  generatedId() {
    if (this.id) {
      return;
    }
    this.id = randomUUID();
  }
}
