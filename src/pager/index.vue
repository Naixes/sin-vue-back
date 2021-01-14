<template>
  <div class="s-pager" :class="{hide: hideIfOnePage && total <= 1}">
      <!-- 5页及以下不显示箭头 -->
      <span class="s-pager-prev" :class="{disabled: current === 1, hide: total <= 5}" @click="change(current-1)">
          <s-icon name="left"></s-icon>
      </span>
      <template v-for="(p, i) in pages">
          <template v-if="p === '...'"><span class="s-pager-item s-pager-dots" :key="i">{{p}}</span></template>
          <template v-else-if="p === current"><span class="s-pager-item active" :key="i">{{p}}</span></template>
          <template v-else><span class="s-pager-item s-pager-other" :key="i" @click="change(p)">{{p}}</span></template>
      </template>
      <span class="s-pager-next" :class="{disabled: current === total, hide: total <= 5}" @click="change(current+1)">
          <s-icon name="right"></s-icon>
      </span>
  </div>
</template>

<script>
import SIcon from '../icon'
export default {
  name: '',
  components: {SIcon},
  props: {
      total: {
          type: Number,
          required: true
      },
      current: {
          type: Number,
          required: true
      },
      hideIfOnePage: {
        type: Boolean,
        default: true
      }
  },
  computed: {
      pages() {
        // 5页及以下不用显示...
        // 需要显示的页数是：1，total，当前页及其前后两页
        // 过滤，排序
        // push...，判断方法：有后一位并且相差大于1
        return this.total <= 5 ? [1,2,3,4,5] : unique([1, this.total, this.current, this.current-1, this.current-2, this.current+1, this.current+2]).filter(p => p>=1 && p<=this.total).sort((a, b) => a-b).reduce((prev, current, i, array) => {
            prev.push(current)
            array[i + 1] && array[i + 1] - array[i] > 1 && prev.push('...')
            return prev
        }, [])
      }
  },
  data() { 
    return {

    }
  },
  methods: {
      change(p) {
          this.$emit("update:current", p)
      }
  }
 }
 function unique(array) {
     return [...new Set(array)]
 }
</script>

<style lang="scss" scoped>
@import "../var";

.s-pager{
    .hide,
    &.hide {
        display: none;
    }
    .s-icon {
        width: $icon-width;
        height: $icon-height;
        margin: $icon-margin;
    }
    &-prev,
    &-next,
    &-item {
        cursor: pointer;
        // 对齐
        vertical-align: bottom;
        border-radius: $border-radius;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        margin: 0 5px;
    }
    &-item {
        border: 1px solid $border-color;
        &:hover {
            border-color: $blue;
        }
    }
    &-prev,
    &-next {
        border: 1px solid $background-color-lighter;
        background-color: $background-color-lighter;
    }
    &-dots {
        border: none;
    }
    .active {
        border-color: $blue;
    }
    .disabled {
        cursor: default;
        svg {
            fill: $disabled-text-color;
        }
    }
}
</style>