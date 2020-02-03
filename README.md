[TOC]

# FullStackLearn

感谢[全栈之巅](https://github.com/topfullstack/topfullstack)的大佬

终于有时间来学习了，哈哈

## Develop Flowing

 大致流程，涉及到辅助流程可能不完善，供新项目开发参考
 内容摘至大佬B站视频[<sup>1</sup>](#ref-anchor)，可能有遗漏和不足，最主要是**理解不到位**
 ps：非科班、没有系统的学习，所以恳请各位指正！可以提交、Issue

### 功能分析
Description：大致功能块
Tool: Mindmap
Core：
- 前后端分离
- 优先完成后端api，然后做前端，便于前端获取数据测试
Output：脑图框架

Todo：
- 数据库设计

### 开发环境
node
git
vscode
Navicat
Chrome

yarn包管理器
```bash
npm install -g yarn
```

GIT项目托管
Core:
- .gitignore
git add .   //添加到本地缓冲区 报错does not have a commit checked out[<sup>转到</sup>](#error-anchor)
```bash 
// 执行路径在项目根目录~/$HOME/
git clone 到本地
cnpm i -g @nestjs/cli
```
[link](https://docs.nestjs.com/first-steps)

### 开发

#### BackEnd

##### Init
```bash  
//下列命令操作基于~/server/路径
nest new server         //后端项目初始化
code server             //cd server 如果不在VSC中Terminal执行，则需要cd到对应文件夹下执行generate
nest generate app amdin //新建子服务，便于实现管理端和客户端的后端
nest start -w admin     //-w 类似于npm run start:dev 开发模式 带watch监听源码变更
```

Core： 
- 大后端包含客户端后台、管理端后台
- 后台公用一套数据Model
- 分别有各自的一套crud及过滤、权限
- server/server :定义 客户端后端
- server/admin :定义 管理端后端

[link](https://docs.nestjs.com/cli/monorepo)

##### Library(database)
后端公用库,可认为是模块

- 新建数据模型共用库Libs
```bash
// 命令执行默认路径/server，注意需要cd过去
nest g lib db   //@libs命名共用库

```

- 将数据库模型导入服务的module中
将DbModule（来源于新生成的libs）导入admin/app.module中

- 连接数据库
数据库模型框架搭好了，与数据库建立连接的相关工具
```bash
//server路径
//cnpm i --save nestjs-typegoose @typegoose/typegoose
yarn add  nestjs-typegoose @typegoose/typegoose mongoose @types/mongoose //mongoose 是mongodb的基本操作库，@type是用于ts中给mongo提供类型提示的包
```

- 数据库模块引入lib/db/db.module.ts中,不用写到服务中的module中，更好的模块化及解耦。
```js
@Module({
  imports:[
    TypegooseModule.forRoot('mongodb://localhost/topfullstack',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    // dbName: 'topfullstack',
    })
  ],
})

```

- 创建数据模型
/libs/db/src/user.model.ts

- User模型引入服务的db.module中
将user.model数据模型引入Model，再通过下面的Module：TypegooseModule处理后，最后Export出去全局引用
完成db.module后，便可以在admin中使用了（之前已经将数据库模型DbModule import到app.module中了）

##### 数据模型创建

- 微服务操作模块
为了模块化、可读性、解耦，单独将数据库操作部分新建文件
```bash
//server路径下
nest g mo -p admin users
//g 创建 mo 模块简写 -p 子包
nest g co -p admin users
// controller和module自动关联import
```
[nest命令Doc](https://docs.nestjs.com/cli/usages)

- crud API包安装

```bash
yarn add nestjs-mongoose-crud
yarn add @nestjs/swagger swagger-ui-express
// 后者是crud包的必要依赖，不然执行报错
```

- 注入模型类到users.controller
构造函数在类初始化时便执行了,使用injectmodel 注入模型给私有类model
```js
export class UsersController {
    constructor(@InjectModel(User) private readonly model) { }
}
```

- 使用crud装饰并建立接口
//users.controller文件中
```js
@Crud({
    model:User
})
```

##### Interface







## Error Log

- nest-cli monorepo 模式命令执行位置导致的问题

| 一定要cd到new中文件夹执行generate app xxxx 子服务
[文档参考](https://docs.nestjs.com/cli/monorepo)


- does not have a commit checked out
<div id="error-anchor"></div>
| 删除无法add目录下隐藏的.git文件夹（vsc中无法看到）
[由于nest初始化过程中带有git信息，导致git add执行报错](https://blog.csdn.net/kikii233/article/details/103801159)

- Invalid tag name "@nestjs-typegoose"
| 包名没有@。。。。   
浪费了半天时间，原本想的直接使用npm，但是在执行yarn add  @nestjs-typegoose @typegoose/typegoose 
报错，没有@nestjs-typegoose的包，查了npmjs官网仓库也没有，只有一个没有@的那个
担心后续出问题，考虑到第一次学习，尽可能减少变量，减少意外错误发生。结果还是出错，这个时候我就开始怀疑是@有问题。。
往后看视频果然。。。。

- -w :dev等开发模式热编译报错
| 排查代码错误后，尝试重启！（同步编译功能也有不完善的时候，特别是yarn npm导入新的packge的时候


- warning: LF will be replaced by CRLF
| 待办
[ref](https://blog.csdn.net/wq6ylg08/article/details/88761581)

## Package Used
- @nestjs/cli
用于nest项目初始化的脚手架
- nestjs-typegoose

- @typegoose/typegoose
装饰器，ts类型提示，swagger 接口测试标记

- mongoose
数据库链接基础库
- @types/mongoose
为mongoose提供类型提示db.module中import forroot中提示
- @nestjs/swagger
swagger接口文档官方包
- swagger-ui-express
基于express的第三方包
- 
- 
- 
- 
- 
- 
- 
- 


## Tips

### VSCode

#### Key Blinding

- 删除整行：ctrl+shift+k

- 快速选中：鼠标双击、三击、四击

[More](https://code.visualstudio.com/docs/getstarted/keybindings)






## Reference
<div id="ref-anchor"></div>
[1] [第一章：(nestjs)NodeJs+VueJs全栈开发《全栈之巅》视频网站+app+小程序](https://www.bilibili.com/video/av73070499)
[2] 