<template>
  <div>
    <h3>课程列表</h3>
    <div>
      <el-button type="success" @click="$router.push(`/courses/create/`)">创建课程</el-button>
      
    </div>
    <el-table :data="data.data" border stripe>
      <el-table-column
        v-for="(field,name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.width"
      ></el-table-column>
      <el-table-column label=" 操作 " :width="200">
        <template v-slot="{row}">
          <!-- 路由设定的理解，push方法时拼接还是/到根 -->
          <el-button
            type="success"
            size="small"
            @click="$router.push(`/courses/edit/${row._id}`)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
// 为何此处没有类型提示了？
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class CourseList extends Vue {
  // 属性写入属于ts的功能
  data = {};

  // 从data.data中获取的数据放置到对象中的字段（数据库字段）
  fields = {
    _id: { label: "ID" },
    name: { label: "课程名称" },
    cover: { label: "课程封面图" }
  };

  // 基于axios异步获取数据
  async fetch() {
    const res = await this.$http.get("courses");
    this.data = res.data;
  }

  async remove(row: any) {
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