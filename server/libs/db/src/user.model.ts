import { prop } from '@typegoose/typegoose'

export class User {

    @prop()
    // 装饰属性
    username: string

    @prop()
    password: string
}