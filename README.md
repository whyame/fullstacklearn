[TOC]

- [FullStackLearn](#fullstacklearn)
  - [Develop Flowing](#develop-flowing)
    - [功能分析](#%e5%8a%9f%e8%83%bd%e5%88%86%e6%9e%90)
    - [开发环境](#%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83)
    - [开发](#%e5%bc%80%e5%8f%91)
      - [BackEnd](#backend)
        - [Init](#init)
        - [Library(database)](#librarydatabase)
        - [Interface](#interface)
        - [API doc](#api-doc)
        - [Interface(完善数据模型&功能)](#interface%e5%ae%8c%e5%96%84%e6%95%b0%e6%8d%ae%e6%a8%a1%e5%9e%8b%e5%8a%9f%e8%83%bd)
        - [视频管理模块](#%e8%a7%86%e9%a2%91%e7%ae%a1%e7%90%86%e6%a8%a1%e5%9d%97)
      - [后台管理页面](#%e5%90%8e%e5%8f%b0%e7%ae%a1%e7%90%86%e9%a1%b5%e9%9d%a2)
        - [Preparation](#preparation)
        - [Init vue](#init-vue)
  - [Error Log](#error-log)
  - [Package Used](#package-used)
  - [Tips](#tips)
    - [VSCode](#vscode)
      - [Key Blinding](#key-blinding)
      - [编辑器提示功能](#%e7%bc%96%e8%be%91%e5%99%a8%e6%8f%90%e7%a4%ba%e5%8a%9f%e8%83%bd)
    - [规范和标准](#%e8%a7%84%e8%8c%83%e5%92%8c%e6%a0%87%e5%87%86)
      - [命名](#%e5%91%bd%e5%90%8d)
  - [Reference](#reference)

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

TODO:
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
TechStack：
- nestjs 
- mongoose 
- typescript

##### Init
```bash  
//下列命令操作基于~/server/路径
nest new server         //后端项目初始化
code server             //cd server 如果不在VSC中Terminal执行，则需要cd到对应文件夹下执行generate
nest generate app amdin //新建子服务，便于实现管理端和客户端的后端
nest start -w admin     //-w 类似于npm run start:dev 开发模式 带watch监听源码变更
// TODO:查找其配置命令位置
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

##### Interface

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

##### API doc
在写接口时就将API文档装饰了，同时也能够做单元测试
[REF](https://docs.nestjs.com/recipes/swagger)

- 将swaggerAPI导入bootstrap，并添加依赖
```JS
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
```

- 模块controller加入标签

为了便于API DOC理解；使用装饰器@ApiTags()装饰controller中的类
如users.controller  注意是服务下的子包user下的

- 数据模型加入标签
使用装饰器    @ApiProperty({description: '用户名',example:''})
如user.model  注意是在libs中的数据模型

- 单元测试
执行一条creat
从建立数据库配置开始，到目前为止，只有当真正写入数据时，才建立数据！！！！

如果mongodb中无此数据库便新建，但是读取无法新建数据库。


##### Interface(完善数据模型&功能)
- 新增User模型Schema字段


##### 视频管理模块

- 数据结构设计
视频模块主要是管理课程数据模型
课程又分为课时、课程名称、封面、。。。。。

- 数据模型间建立关系
课时集合，一种是内嵌课时合集；另一种实现方式是将课时模型独立出来，通过关系数据思维进行关联
libs/db中course模型下导入episodes数据，再新建episode.model模型

```js
@arrayProp({ itemsRef: 'Episode' })
    //一定要定义，才能让nest处理，下面是ts提示用的；最好字符串方式，避免循环引用时，初始化先后顺序导致error
    episodes: Ref<Episode>[]
    // 数组数据模型， 类似mysql外键方式，通过Ref泛型关联Episode数据模型 Ref是nest内建的参考类型
```
完成course和episode数据模型建立及关联

- 新建课程管理模块courses
用于课程数据的管理

```bash
//server路径下
nest g mo -p admin courses
nest g co -p admin courses
```

- 建立course数据模型与控制器和数据库模型的引入关系 
导入db/course.model模型到courses.controller
参考上文users.controller的inject注入方式
将数据模型引入db.module
```js
const models = TypegooseModule.forFeature([  User,  Course,  Episode,])
```

- 建立episodes的crud

```bash
//server路径下
nest g mo -p admin episodes
nest g co -p admin episodes
```

导入数据模型，注入管理模块

#### 后台管理页面
TechStack：
- vue 
- Element-UI 
- typescript

##### Preparation

如果没有安装vue/cli可以执行下面操作
```bash
$ cnpm install -g @vue/cli
```
[Cli](https://cli.vuejs.org/)
[@VUE](https://cn.vuejs.org/v2/guide/typescript.html)

##### Init vue 

```bash
# 项目根目录/%HOME%/
$ vue create admin
# 一定要在vue子项目中运行vue相关命令
$ cd admin
# 添加element库，fully import/overwirte: NO/
$ vue add element
# 添加路由支持,history mode :NO
$ vue add router
# ts转换 全部默认执行即可
$ vue add typescript
```

- vue中入口文件main 中element.js的引用均改为ts版本
| import './plugins/element'

- 跑服务

```bash
# vue的admin目录下
$ yarn serve
```

```html
<script lang='ts'></script>
```





















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

- Nest can't resolve dependencies of the CoursesController (?). Please make sure that the argument CourseModel at index [0] is available in the CoursesModule context

新建了数据模型，并且在服务也建立了控制器并关联了，但是未将数据模型引入db.module

| const models = TypegooseModule.forFeature([  User,  Course,  Episode,])









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


#### 编辑器提示功能

- 导入丢失模块：Alt+Enter


### 规范和标准

#### 命名

- 数据模型文件（libs/db/src下）一般采用单数，
- 服务下的模块、控制器文件一般复数
- 单数命名：类、方法
- 复数命名：控制器（管理一组、一类数据）
- 全部小写：变量、常量
- 驼峰命名：类、
- 首字母大写：装饰器(通常)，依赖注入
- 首字母小写：方法、函数



## Reference
<div id="ref-anchor"></div>
[1] [第一章：(nestjs)NodeJs+VueJs全栈开发《全栈之巅》视频网站+app+小程序](https://www.bilibili.com/video/av73070499)
[2] [nestjs](https://nestjs.com/)
[3] [vuejs](https://cn.vuejs.org/)
[4] [npmjs](https://www.npmjs.com/)
