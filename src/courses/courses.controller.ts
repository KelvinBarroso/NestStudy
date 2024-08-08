import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coursesService.findOne(id);
  }
  @Post()
  create(@Body() body: CreateCourseDTO) {
    return this.coursesService.create(body);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateCourseDTO) {
    return this.coursesService.update(id, body);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coursesService.remove(id);
  }
}
