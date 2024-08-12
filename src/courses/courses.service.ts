import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';
import { CreateCourseDTO } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    return this.courseRepository.find({ relations: ['tags'] });
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!course) {
      throw new HttpException(
        `Course ID ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  async create(createCourseDTO: CreateCourseDTO) {
    const tags =
      createCourseDTO.tags &&
      (await Promise.all(
        createCourseDTO.tags.map((name) => this.preloadTagByname(name)),
      ));
    const course = this.courseRepository.create({ ...createCourseDTO, tags });
    return await this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDTO: any) {
    const tags =
      updateCourseDTO.tags &&
      (await Promise.all(
        updateCourseDTO.tags.map((name) => this.preloadTagByname(name)),
      ));
    const course = await this.courseRepository.preload({
      ...updateCourseDTO,
      id,
      tags,
    });
    if (!course) {
      throw new HttpException(
        `Course ID ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
    });
    if (!course) {
      throw new HttpException(
        `Course ID ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.courseRepository.remove(course);
  }

  async preloadTagByname(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name } });

    if (tag) {
      return tag;
    }
    return this.tagRepository.create({ name });
  }
}
