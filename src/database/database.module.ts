import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Tag } from 'src/courses/entities/tag.entity';
import { CreateCoursesTable1723462636778 } from 'src/migrations/1723462636778-CreateCoursesTable';
import { CreateTableTags1723463850530 } from 'src/migrations/1723463850530-CreateTableTags';
import { CreateTableCoursesTags1723464383415 } from 'src/migrations/1723464383415-CreateTableCoursesTags';
import { InsertColumnCourseIdInCoursesTagsTable1723464660053 } from 'src/migrations/1723464660053-InsertColumnCourseIdInCoursesTagsTable';
import { InsertColumnTagsIdInCoursesTagsTable1723465019768 } from 'src/migrations/1723465019768-InsertColumnTagsIdInCoursesTagsTable';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'devtraining',
  entities: [Course, Tag],
  synchronize: false,
  migrations: [
    CreateCoursesTable1723462636778,
    CreateTableTags1723463850530,
    CreateTableCoursesTags1723464383415,
    InsertColumnCourseIdInCoursesTagsTable1723464660053,
    InsertColumnTagsIdInCoursesTagsTable1723465019768,    
  ],
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ...dataSourceOptions,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
