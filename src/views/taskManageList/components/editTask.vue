<template>
  <div>
    <a-modal
      title="任务"
      :visible="editShow"
      @cancel="hiddenEditTask"
      @ok="editSbumit"
      :width="750"
      class="task-detail"
    >
      <div class="list">
        <p class="item">
          <span></span>
        </p>
        <p class="item">
          <span></span>
        </p>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    editShow: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  methods: {
    hiddenEditTask() {
      this.$emit('hiddenEditTask')
    },
    editSbumit() {
      this.$emit('editSbumit')
    }
  }
}
</script>
<style lang="less" scoped>
</style>