<template>
  <div class="SideMenu">
    <a-menu
      mode="inline"
      theme="dark"
      :selectedKeys="selectedKeys"
      :defaultOpenKeys="openKeys"
      :inlineCollapsed="collapsed"
      @click="gotoRoute"
    >
      <template v-for="item in menuList">
        <a-menu-item
          v-if="!item.children"
          v-show="!item.hidden"
          :key="item.name"
        >
          <template v-if="item.meta.icon">
            <a-icon :type="item.meta.icon"/>
          </template>
          <span>{{item.meta.name}}</span>
        </a-menu-item>
        <menu-item
          v-else
          :menuInfo="item"
          :key="item.name"
        />
      </template>
    </a-menu>
  </div>
</template>
<script>
import MenuItem from './MenuItem.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'SideMenu',
  data() {
    return {
      collapsed: false,
      selectMenuName: '',
      isFirstInPage: true
    }
  },
  components: {
    MenuItem
  },
  computed: {
    ...mapGetters({
      menuList: 'routes'
    }),
    selectedKeys() {
      debugger
      let matched = this.$route.matched
      let showMenu = matched[ matched.length - 1 ].name
      let isHidden = false
      this.menuList.forEach((item, index) => {
        if (item.name === showMenu) {
          isHidden = item.hidden
        }
      })
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (this.isFirstInPage && isHidden){
        this.selectMenuName = matched[ matched.length - 1 ].meta.parentMenuName ? matched[ matched.length - 1 ].meta.parentMenuName : [matched[ matched.length - 1 ].name]
      } else if (!this.isFirstInPage || !isHidden) {
        this.selectMenuName = isHidden ? this.selectMenuName : [matched[ matched.length - 1 ].name]
      }
      this.isFirstInPage = false
      return this.selectMenuName
    },
    openKeys() {
      let matched = this.$route.matched
      return matched
        .filter((item, index) => index !== 0 && index !== matched.length - 1)
        .map(item => item.name)
    }
  },
  methods: {
    gotoRoute(menu) {
      this.$router.push({ name: menu.key })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
