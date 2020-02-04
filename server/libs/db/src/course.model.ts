import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { Episode } from './episode.model'


@modelOptions({
    schemaOptions: {
        timestamps: true,
        // toJSON: true,
    }
})
// 定义这个模型的其他属性，同mongoose在schema中的功能。

export class Course {

    @ApiProperty({ description: '课程名称', example: '请输入课程名' })
    @prop()
    // 装饰属性，prop是必要的
    name: string

    // @ApiProperty({ description: '课程内容', example: '请输入课程内容' })
    // @prop()
    // content: string

    @ApiProperty({ description: '封面图' })
    @prop()
    cover: string

    @arrayProp({ itemsRef: 'Episode' })
    //一定要定义，才能让nest处理，下面是ts提示用的；最好字符串方式，避免循环引用时，初始化先后顺序导致error
    episodes: Ref<Episode>[]
    // 数组数据模型， 类似mysql外键方式，通过Ref泛型关联Episode数据模型 Ref是nest内建的参考类型
}