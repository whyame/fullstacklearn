<template>
  <el-container>
    <el-aside width="200px">
      <!-- Aside content -->
      <el-menu mode="vertical" style="height:100vh;" :default-active="$route.path" router>
        <!-- 二级菜单在menu的items中循环，menu在底部ts中定义 -->
        <el-submenu
          v-for="(item, index) in menu.items"
          :index="`menu-item-${index}`"
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
      <el-header height>
        <!-- Header content -->
        <h1>后台管理界面</h1>
      </el-header>
      <el-main height>
        <!-- Main content -->
        <router-view :key="$route.path"></router-view>
        <!-- router-view子路由容器 基于当前路由路径来更新页面-->
      </el-main>
    </el-container>
  </el-container>
</template>

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
          { title: "课时管理", path: "/courses/list" }
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

<style>
body {
  margin: 0;
}
</style>