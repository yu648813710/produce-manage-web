<template functional>
  <a-sub-menu :key="props.menuInfo.name">
    <span slot="title">
      <template v-if="props.menuInfo.meta.icon">
        <a-icon :type="props.menuInfo.meta.icon" />
      </template>
      <span>{{ props.menuInfo.meta.name }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        v-show="!item.hidden"
        :key="item.name"
      >
        <template v-if="item.meta.icon">
          <a-icon :type="item.meta.icon" />
        </template>
        <span>{{ item.meta.name }}</span>
      </a-menu-item>
      <menu-item
        v-else
        :key="item.name"
        :menu-list="item"
      />
    </template>
  </a-sub-menu>
</template>
<script>
import Vue from 'vue'
import { Menu, Icon } from 'ant-design-vue'
Vue.use(Menu)
export default {
  props: ['menuInfo'],
  components: {
    'a-icon': Icon
  }
}
</script>
