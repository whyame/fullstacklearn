<template>
  <div>
    <!-- res时获取的返回的data数据中还有个data才是需要处理的数据，可以查看接口api -->
    <avue-crud
      :data="data.data"
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
// 为何此处没有类型提示了？
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class CourseCrud extends Vue {
  // 属性写入属于ts的功能
  data = {};

  // // 从data.data中获取的数据放置到对象中的字段（数据库字段）
  // fields = {
  //   _id: { label: "ID" },
  //   name: { label: "课程名称" },
  //   cover: { label: "课程封面图" }
  // 使用avue规范定义数据
  option = {
    title: "课程列表",
    // page: false,
    // align: "center",
    menuAlign: "center",
    column: [
      {
        label: "课程名称",
        prop: "name"
      },
      {
        label: "课程封面图",
        prop: "cover"
      }
    ]
  };

  // 基于axios异步获取数据
  async fetch() {
    const res = await this.$http.get("courses");
    this.data = res.data;
  }

  async create(row, done, loading) {
    await this.$http.post("courses", row);
    this.$message.success("创建成功");
    this.fetch();
    // done函数fetch数据自动加载完后自动关闭框的功能
    done();
  }

  async update(row, index, done, loading) {
    // 对象的复制，stringify先将row转换成json字符串格式，再parse转换成对象格式
    const data = JSON.parse(JSON.stringify(row));
    //删除avue添加的数据字段
    delete data.$index;
    // global.console.log(data) 注意要更换为传递出去的数据为data不是之前的row了!
    await this.$http.put(`courses/${row._id}`, data);
    this.$message.success("编辑成功");
    this.fetch();
    // done函数fetch数据自动加载完后自动关闭框的功能
    done();
  }
  async remove(row, index) {
    try {
      await this.$confirm("您确定要删除吗？");
    } catch (error) {
      // 使用try catch去捕获确定弹出取消的console报错，使用return跳出此函数
      return;
    }
    await this.$http.delete(`courses/${row._id}`);
    this.$message.success("删除成功");
    // 删除成功后重新获取数据，更新页面
    this.fetch();
  }

  created() {
    this.fetch();
  }
}
</script>

<style>
</style>