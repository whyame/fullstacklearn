import { prop, modelOptions } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'


@modelOptions({
    schemaOptions: {
        timestamps: true,
        // toJSON: true,
    }
})
// 定义这个模型的其他属性，同mongoose在schema中的功能。

export class Episode {

    @ApiProperty({ description: '课程名称', example: '请输入课程名' })
    @prop()
    // 装饰属性，prop是必要的
    name: string

    @ApiProperty({ description: '视频' })
    @prop()
    //可以是video之类的，为了拓展性，定义为file，可放视频、音频、文件
    file: string

    @ApiProperty({ description: '封面图' })
    @prop()
    cover: string


}