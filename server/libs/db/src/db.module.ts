import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { User } from './user.model';
import { Course } from './course.model';
import { Episode } from './episode.model';

const models = TypegooseModule.forFeature([
  User,
  Course,
  Episode,

])
// 将user.model数据模型引入model，再通过下面的Module：TypegooseModule处理后，最后Export出去全局引用
@Global()
// 标记全局可引用
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/topfullstack', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      // dbName: 'topfullstack',
    }),
    models,
    // https://www.npmjs.com/package/nestjs-typegoose
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule { }
