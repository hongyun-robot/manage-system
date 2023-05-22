<template>
  <div class="header">
    <div class="left">后台管理系统</div>
    <div class="right">
      <div class="avatar">
        <el-avatar
          :size="50"
          :src="avatarSrc"
        />
        <el-dropdown class="dropdown">
          <span>
            admin
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import { ref } from 'vue';
import avatarSrc from '@/assets/image/layout/face-bug.jpeg'
// const avatarSrc = ref('')
</script>
<style lang="scss" scoped>
.header {
  color: var(--el-color-white);
  height: 70px;
  background-color: var(--el-color-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .right {
    .avatar {
      display: flex;
      align-items: center;

      .dropdown {
        color: var(--el-color-white);
        margin-left: 10px;
      }
    }
  }
}
</style>
