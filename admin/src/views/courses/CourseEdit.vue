<template>
  <div>
    <h3>{{isNew ? '创建': '编辑'}} 课程</h3>
    <ele-form :form-data="data" :form-desc="fields" :request-fn="submit"></ele-form>
  </div>
</template>

<script lang="ts">
// 为何此处没有类型提示了？
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({})
export default class CourseEdit extends Vue {
  // 从router中获取传递的id,mongodb中id是字符串类型 为何大小写区别报错？

  @Prop(String) id!: string;
  data = {};

  // 从data.data中获取的数据放置到对象中的字段（数据库字段）
  fields = {
    name: { label: "课程名称", type: "input" },
    cover: { label: "课程封面图", type: "input" }
  };
  //计算属性，用于区分编辑页面和创建页面,ES的特性，get将函数、方法当作属性来用！
  get isNew() {
    return !this.id;
  }

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
}
</script>

<style>
</style>