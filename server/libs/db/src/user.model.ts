import { prop, modelOptions } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'


@modelOptions({
    schemaOptions: {
        timestamps: true,
        // toJSON: true,
    }
})
// 定义这个模型的其他属性，同mongoose在schema中的功能。

export class User {

    @ApiProperty({ description: '用户名', example: '请输入用户名' })
    @prop()
    // 装饰属性
    username: string

    @ApiProperty({ description: '密码', example: '请输入密码' })
    @prop()
    password: string

    // @ApiProperty({description: '创建时间',example:'xxxx-xx-xx'})
    // @prop()
    // creat_time: string

    // @ApiProperty({description: '更新时间',example:'xxxx-xx-xx'})
    // @prop()
    // change_time: string


}