<template>
  <el-menu
    mode="horizontal"
    :default-active="currentRoute"
    router
  >
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/trade">二手交易</el-menu-item>
    <el-menu-item index="/lost-found">失物招领</el-menu-item>
    <el-menu-item index="/group-buy">拼单搭子</el-menu-item>
    <el-menu-item index="/errand">跑腿委托</el-menu-item>
    <el-menu-item index="/publish">发布</el-menu-item>
    <el-menu-item index="/message">消息</el-menu-item>
    <el-menu-item index="/user">个人中心</el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRoute = computed(() => route.path)
</script>

<style scoped>
.el-menu {
  border-bottom: none;
}
</style>
