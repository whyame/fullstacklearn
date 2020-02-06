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
      - [FrontEnd](#frontend)
        - [Preparation](#preparation)
        - [Init vue](#init-vue)
        - [搭建前端主页面](#%e6%90%ad%e5%bb%ba%e5%89%8d%e7%ab%af%e4%b8%bb%e9%a1%b5%e9%9d%a2)
        - [课程页面](#%e8%af%be%e7%a8%8b%e9%a1%b5%e9%9d%a2)
        - [编辑课程页面](#%e7%bc%96%e8%be%91%e8%af%be%e7%a8%8b%e9%a1%b5%e9%9d%a2)
        - [使用AVUE 改造CRUD](#%e4%bd%bf%e7%94%a8avue-%e6%94%b9%e9%80%a0crud)
  - [Error Log](#error-log)
        - [更灵活拓展性的crud](#%e6%9b%b4%e7%81%b5%e6%b4%bb%e6%8b%93%e5%b1%95%e6%80%a7%e7%9a%84crud)
  - [Package Used](#package-used)
  - [Tips](#tips)
    - [VSCode](#vscode)
      - [Key Blinding](#key-blinding)
      - [编辑器提示功能](#%e7%bc%96%e8%be%91%e5%99%a8%e6%8f%90%e7%a4%ba%e5%8a%9f%e8%83%bd)
    - [规范和标准](#%e8%a7%84%e8%8c%83%e5%92%8c%e6%a0%87%e5%87%86)
      - [命名](#%e5%91%bd%e5%90%8d)
    - [TypeScript](#typescript)
    - [Syntax](#syntax)
    - [建议](#%e5%bb%ba%e8%ae%ae)
  - [Reference](#reference)

# FullStackLearn

感谢[全栈之巅](https://github.com/topfullstack/topfullstack)的大佬

终于有时间来学习了，哈哈
2020年2月6日要开始忙了，可能暂时不会更新了

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

#### FrontEnd
后台管理页面
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

html、vue下的ts使用方式
```html
<script lang='ts'></script>
```

##### 搭建前端主页面

原型：左侧侧边栏、顶部路由栏

- 清理主页面
在App.vue将布局更换为 <router-view></router-view>
删除不需要的组件helloworld
删除自带的样式

删除后就显示的home的组件内容，因为index.ts主页路由用的时home组件

- 建立主要布局文件Main.vue

| vscode 插件 Element UI Snippets 可以快速导入element模块
| 如elcon 快速新建element 容器

- 填写element容器的内容


- index.ts路由文件引入Main.vue

- 为routes添加类型提示
| 查看需要提示的部分是什么类型的，然后再到需要提示处使用ts：注明类型即可！

- Main.vue导出Main组件

- 侧边栏完善
  在<el-aside width="200px">标签下
  elmen

  default-active="$route.path"    高亮选择路由

数据写到文件下的script中，不要写死到html中，有利于动态数据及权限管理

**一定要好好理解这个菜单编写的逻辑**

```html
<el-container>
    <el-aside width="200px">
      <!-- Aside content -->
      <el-menu mode="vertical" :default-active="$route.path" router>
        <!-- 二级菜单在menu的items中循环，menu在底部ts中定义 -->
        <el-submenu
          v-for="(item, index) in menu.items"
          :index="index + 1"
          这里的不冲突命名是个什么道理？标签里面如何注释？
          :key="`menu-item-${index}`"
        >
          <template slot="title">{{item.title}}</template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.items"
            :index="subItem.path"
            :key="`menu-item-${index}-${subIndex}`"
          >{{subItem.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
// @Component标记导出类Main是一个vue组件
export default class Main extends Vue {
  menu = {
    items: [
      {
        title: "内容管理",
        items: [
          { title: "首页", path: "/" },
          { title: "课程管理", path: "/courses/list" },
          { title: "课程管理", path: "/courses/list" }
        ]
      },
      {
        title: "用户管理",
        items: [{ title: "课程管理", path: "/users/list" }]
      }
    ]
  };
  // 数据写到下面来，不要写死到html中，有利于动态数据及权限管理
}
</script>
```
[课程查看6P 12:00](https://www.bilibili.com/video/av73070499?p=6)


##### 课程页面

- views下新增courses文件夹便于统一管理
- 新建CourseList.vue

通过vetur插件提供的Snippet功能
vue简写快速构建框架

- 在index.ts中引入CourseList到子路由
```js
    { name: 'courses-list', path: '/courses/list', component: CourseList }
```

- 使用axios建立前后端数据连接
比fetch简便
```bash
yarn add axios @types/axios
```
- 将axios引入main.ts
通过axios与后台API对接
```ts
Vue.prototype.$http = Axios.create({
  baseURL: 'http://loalhost:3000'
})
```

- CourseList.vue数据操作功能

[课程查看7P 5:30](https://www.bilibili.com/video/av73070499?p=7)

```ts
  // 基于axios异步获取数据
  async fetch() {
    const res = await this.$http.get("courses");
    this.data = res.data;
  }
```

- 将vue中获取的数据展示到前台

使用elta快捷生成element table


[7P 14:00]
v-for传递两个值(field,name)
因为需要用唯一值name定义Key

组件中添加添加字段属性的label（中文标签）


##### 编辑课程页面

- 创建CourseEdit.vue

- 建立路由
router/index.ts
```ts
      // 接受参数路由,并将页面获取到的id参数传递给组件
      { name: 'courses-edit', path: '/courses/edit/:id', component: CourseEdit, props: true },
      { name: 'courses-create', path: '/courses/create', component: CourseEdit }
```

- Main.vue
  由于创建和编辑页面均使用的是CourseEdit组件，可能会出现误认为同一页面不更新数据的情况，通过更改键值调整
```html
          <router-view :key="$route.path"></router-view>
        <!-- router-view子路由容器 基于当前路由路径来更新页面-->
```

- 计算属性区分页面
  
```html
  三元运算符
  {{isNew ? '创建': '编辑'}} 
```
```ts
  //计算属性，用于区分编辑页面和创建页面,ES的特性，get将函数、方法当作属性来用！
  get isNew() {
    return !this.id;
  }
```

- vue-ele-form
```bash
$ yarn add vue-ele-form
```

- 自定义类型申明文件.d.ts
需要重启服务！
[8P 5:30]

- ele-form使用表单
```html
    <el-table :data="data.data" border stripe>
      <el-table-column
        v-for="(field,name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.width"
      ></el-table-column>
    </el-table>
```


- 数据数据提交
[9P 00:00]
```ts
  // 用于表单提交数据,data数据理应做class数据类限定，但是大佬还没做，我也不清楚
  async submit(data: any){

    this.data= {}
    //提交后数据需要清空，安全问题
    // global.console.log(data) 全局console检测表单提交功能
    await this.$http.post('courses',data)
    // 需要查看API接口文档API-DOC的课程提交，使用的post方法，传递了data数据？
    this.$message.success('保存成功')
    //提交成功后，提示页面，并返回上一个页面
    this.$router.go(-1)
  }
```
TODO:弹幕又看到说用try catch，不太懂，好像实际业务有需要用到

[9P 3:23]
- 编辑页面按键

用ELTAC Snippet构建表格
创建template，因为要用按键，可能时vue需要注明区域渲染吧。。
ELB创建按键区域

[9P 4:00]
- 设定按键跳转路由！"$router.push(`/courses/edit/${row._id}`
TODO: 解构的理解；有关scope作用域的写法和理解

[v-slot](https://cn.vuejs.org/v2/api/#v-slot)

```ts
      <el-table-column label=" 操作 " :width="200">
        <template v-slot="{row}">
          <el-button type="success" size="small" @click="$router.push(`/courses/edit/${row._id}`)">编辑</el-button>
        </template>
      </el-table-column>
```

[9P 7:00]
- 编辑页面与create页面获取数据逻辑的预处理

```ts
  // 基于axios异步获取数据
  async fetch() {
    const res = await this.$http.get(`courses/${this.id}`);
    this.data = res.data;
  }
  // 用于表单提交数据,data数据理应做class数据类限定，但是大佬还没做，我也不清楚
  async submit(data: any) {
    // global.console.log(data) 全局console检测表单提交功能
    // 通过判定路径来确定功能
    const url = this.isNew ? `courses` : `courses/${this.id}`;
    const method = this.isNew ? "post" : "put";
    //无法直接调用method，获取对象的某一个方法的变量需要用[]
    await this.$http[method](url, data);
    // 需要查看API接口文档API-DOC的课程提交，使用的post方法，传递了data数据？
    this.$message.success("保存成功");
    //提交成功后，提示页面，并返回上一个页面
    this.data = {};
    //提交后数据需要清空，安全问题
    this.$router.go(-1);
  }
  created() {
    // 如果时编辑时，进入这个页面（组件）时，需要获取当前id，所以需要fetch。通过判断是否是新纪录去执行
    !this.isNew && this.fetch();
  }
```

List页面使用了try catch的方式处理报错

[10P 4:26]

- 建立创建按钮
 


##### 使用AVUE 改造CRUD

- 安装包
```bash
$ npm i @smallwei/avue -S
```
- 类似element的plugin引入
新建/plugin/avue.js
- main.ts引入调整
- 路由index.ts调整
- [AVUECRUD](https://avuejs.com/doc/crud/crud)
- 执行逻辑
  通过fetch获取data数据，再this.data赋值到本域，最后template里才能有效调用

- AVUE接口请求

- 事件监听
  [row-save](https://avuejs.com/doc/crud/crud-doc)


[12P 6:17]

```ts
    // 对象的复制，stringify先将row转换成json字符串格式，再parse转换成对象格式
    const data = JSON.parse(JSON.stringify(row))
    delete data.$index
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


- XMLHttpRequest CORS跨域问题

我没有报错，但是记录一下
在服务端admin子包main.ts中添加
| app.enableCors()



- Provisional headers are shown
axios与后端建立连接的时候报错。。。

经过多次排查，看了跨域、浏览器插件问题说、请求时间差、缓存问题。。。都试了
最终在请求体XHR中发现。。。原来路径错了！！！localhost写错了。。。。
可以看出Typescript的优势了。。



- type check failed for prop "index"
Expected String with value "1", got Number with value 1
index 属性获取的类型不匹配
| 通过强制类型转换传递字符串`menu-item-${index}`



- @Prop(String) id:string

TODO:从router中获取传递的id,mongodb中id是字符串类型 为何大小写区别报错？

奇怪，为何跑起来id报错，但是页面显示、编辑器均没有提示错误呢？
14:17 Property 'id' has no initializer and is not definitely assigned in the constructor.
    12 |   // 属性写入属于ts的功能
    13 |   // 从router中获取传递的id,mongodb中id是字符串类型 为何大小写区别报错？
  > 14 |   @Prop(String) id: string;

| 通过加!提示编译器值不为空。 @Prop(String) id!: string;


- $index. Expected an object

由于使用avue，将数据加了一行$index，导致服务端请求500错误
| 删除多余字段 ,注意数据转换
[12P 4:30](https://www.bilibili.com/video/av73070499?p=12)


##### 更灵活拓展性的crud







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
- axios

- @types/axios
vsc类型提示
- vue-ele-form
vue element动态表单插件
- @smallwei/avue
前端数据可视化组件
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

- xxx.d.ts：一般用于ts类型定义



### TypeScript

- 类型提示的方式
  在vue还未完全支持ts的情况下，许多地方需要手动添加类型支持
  添加方法和思路就是：查看需要提示的部分是什么类型的，然后再到需要提示处使用ts：注明类型即可！
  如routes的属性没有提示，可以查看实例化的routes是什么类型，然后再代码标记

```ts
const routes: RouteConfig[] = [
  {
    path: '/',
    component: Main,
    // children子路由
    children: [
      { name: 'home', path: '/', component: Home }
    ]
  },
]

const router = new VueRouter({
  routes
})
```

这个方法真的太优秀了。[课程查看 6P 9:10](https://www.bilibili.com/video/av73070499?p=6)


- .d.ts文件添加类型提示

[课程查看7P 8:10](https://www.bilibili.com/video/av73070499?p=7)

./admin/src/index.d.ts
```ts
import { AxiosInstance } from "axios";

declare module 'vue/types/vue' {
    // 3. 声明为 Vue 补充的东西
    interface Vue {
        $http: AxiosInstance
    }
}
```
注意添加类型定义文件后需要重启vscode

**注意要重启服务！！**
vue-ele-form都是因为没有重启服务导致报错


### Syntax

{}  对象
[]  数组
``  带计算属性的字符串
|     const res = await this.$http.get(`courses/${this.id}`);
=>  返回相当于函数内的return

&&  只要“&&”前面是false，无论“&&”后面是true还是false，结果都将返“&&”前面的值;只要“&&”前面是true，结果都将返“&&”后面的值
| !this.isNew && this.fetch(); 

:   v-blnd 数据绑定简写
@   在vue标签中的意思v-on 事件简写




### 建议

- 调试浏览器建议chrome
  
同样的服务，在edge上报304错误。chrome没问题



## Reference
<div id="ref-anchor"></div>
[1] [第一章：(nestjs)NodeJs+VueJs全栈开发《全栈之巅》视频网站+app+小程序](https://www.bilibili.com/video/av73070499)
[2] [nestjs](https://nestjs.com/)
[3] [vuejs](https://cn.vuejs.org/)
[4] [npmjs](https://www.npmjs.com/)
[4] [avuejs](https://avuejs.com/doc/crud/crud-doc)
[5] [element](https://element.eleme.cn/#/zh-CN)

