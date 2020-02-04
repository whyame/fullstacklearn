import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/user.model';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';

@Crud({
    model:User
})
@ApiTags('用户管理')
@Controller('users')
export class UsersController {
    constructor(@InjectModel(User) private readonly model) { }
    //构造函数在类初始化时便执行了,使用injectmodel 注入User模型给私有类model

}
