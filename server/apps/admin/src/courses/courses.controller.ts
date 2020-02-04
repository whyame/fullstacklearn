import { Controller, Type } from '@nestjs/common';
import{ Crud } from 'nestjs-mongoose-crud'
import { Course } from '@libs/db/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({
    model:Course,
})

@Controller('courses')

@ApiTags('课程管理')
export class CoursesController {
    constructor(
        @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>
        // 也可以不定义类型
    ){}
}
