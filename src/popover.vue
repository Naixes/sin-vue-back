<template>
  <div class="s-popover" ref="popover">
    <!-- 弹出内容 -->
    <div
      ref="contentWrapper"
      class="s-popover-content-wrapper"
      :class="{[`position-${position}`]: true}"
      v-if="visible"
    >
      <slot name="content"></slot>
    </div>
    <!-- 默认插槽 -->
    <div ref="triggerWrapper" class="trigger-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: "top",
      validator(value) {
        return ["top", "bottom", "left", "right"].indexOf(value) >= 0;
      }
    },
    // 触发方式
    trigger: {
      type: String,
      default: "click",
      validator(value) {
        return ["click", "hover"].indexOf(value) >= 0;
      }
    }
  },
//   computed: {
//       openEventType() {
//           return this.trigger === "click" ? 'click' : 'mouseenter'
//       },
//       closeEventType() {
//           return this.trigger === "click" ? 'click' : 'mouseleave'
//       }
//   },
  data() {
    return {
      visible: false
    };
  },
  mounted() {
      if(this.trigger === 'click') {
        this.$refs.popover.addEventListener('click', this.toggle)
      }else {
        this.$refs.popover.addEventListener('mouseenter', this.open)
        this.$refs.popover.addEventListener('mouseleave', this.close)
      }
  },
  destroyed() {
      if(this.trigger === 'click') {
        this.$refs.popover.removeEventListener('click', this.toggle)
      }else {
        this.$refs.popover.removeEventListener('mouseenter', this.open)
        this.$refs.popover.removeEventListener('mouseleave', this.close)
      }
  },
  methods: {
    toggle(e) {
      // 点击的是触发器
      if (this.$refs.triggerWrapper.contains(e.target)) {
        if (this.visible) {
          this.close();
        } else {
          this.open();
        }
      }
    },
    open() {
      this.visible = true;
      this.$nextTick(() => {
        // 显示弹框内容
        this.appendPopover();
        // 监听外部点击事件
        this.trigger === 'click' && document.addEventListener("click", this.clickHandle);
      });
    },
    // 收拢close方法
    close() {
      this.visible = false;
      this.trigger === 'click' && document.removeEventListener("click", this.clickHandle);
    },
    appendPopover() {
      // 为了防止外部容器有overflow: hidden导致不能弹出内容，手动添加dom
      document.body.appendChild(this.$refs.contentWrapper);
      // 改变弹出位置
      let {
        left,
        top,
        width,
        height
      } = this.$refs.triggerWrapper.getBoundingClientRect();
      let {
        width: contentWidth,
        height: contentHeight
      } = this.$refs.contentWrapper.getBoundingClientRect();
    //   switch (this.position) {
    //     case "top":
    //       // 不受滚动的影响
    //       this.$refs.contentWrapper.style.left = left + window.scrollX + "px";
    //       this.$refs.contentWrapper.style.top = top + window.scrollY + "px";
    //       break;
    //     case "bottom":
    //       this.$refs.contentWrapper.style.left = left + window.scrollX + "px";
    //       this.$refs.contentWrapper.style.top =
    //         top + height + contentHeight + window.scrollY + "px";
    //       break;
    //     case "left":
    //       this.$refs.contentWrapper.style.left =
    //         left - contentWidth + window.scrollX + "px";
    //       this.$refs.contentWrapper.style.top =
    //         top + contentHeight - (contentHeight - height) / 2 + window.scrollY + "px";
    //       break;
    //     case "right":
    //       this.$refs.contentWrapper.style.left =
    //         left + width + window.scrollX + "px";
    //       this.$refs.contentWrapper.style.top =
    //         top + contentHeight - (contentHeight - height) / 2 + window.scrollY + "px";
    //       break;
    //   }
      // 使用表结构重构
      let map = {
          "top": {
              "top": top,
              "left": left
          },
          "bottom": {
              "top": top + height + contentHeight,
              "left": left
          },
          "left": {
              "top": top + contentHeight - (contentHeight - height) / 2,
              "left": left - contentWidth
          },
          "right": {
              "top": top + contentHeight - (contentHeight - height) / 2,
              "left": left + width
          },
      }
      this.$refs.contentWrapper.style.left = map[this.position].left + window.scrollX + "px";
      this.$refs.contentWrapper.style.top =
      map[this.position].top + window.scrollY + "px";
    },
    clickHandle(e) {
      // 点击自身，直接返回
      if (
        (this.$refs.popover && this.$refs.popover.contains(e.target)) ||
        this.$refs.popover === e.target
      ) {
        return;
      }
      // 点击pop，直接返回
      if (
        (this.$refs.contentWrapper &&
          this.$refs.contentWrapper.contains(e.target)) ||
        this.$refs.contentWrapper === e.target
      ) {
        return;
      }
      // 关闭pop，解除监听
      this.close();
    },
    // toggle() {
    //     this.visible = !this.visible
    //     // 点击外部关闭，避免点开后立刻关闭使用nexttick
    //     if(this.visible) {
    //         this.$nextTick(() => {
    //             // 为了防止外部容器有overflow: hidden导致不能弹出内容，手动添加dom
    //             document.body.appendChild(this.$refs.contentWrapper)
    //             // 改变弹出位置
    //             let {left, top, width, height} = this.$refs.triggerWrapper.getBoundingClientRect()
    //             // 不受滚动的影响
    //             this.$refs.contentWrapper.style.left = left + screenX + 'px'
    //             this.$refs.contentWrapper.style.top = top + scrollY + 'px'
    //             let clickHandle = () => {
    //                 this.visible = false
    //                 // 解除绑定
    //                 document.removeEventListener('click', clickHandle)
    //             }
    //             document.addEventListener('click', clickHandle)
    //         })
    //     }
    // }
  }
};
</script>

<style lang="scss" scoped>
$border-color: #999;
$border-radius: 4px;
$s-popover-max-width: 400px;
.s-popover {
  display: inline-block;
  position: relative;
  .trigger-wrapper {
    display: inline-block;
  }
}
.s-popover-content-wrapper {
  padding: 0.5em 1em;
  position: absolute; display: inline-block;
  transform: translateY(-100%);
  max-width: $s-popover-max-width;
  // height: fit-content; // 防止绝对定位后没有高度
  border: 1px solid $border-color; border-radius: $border-radius;
  // 阴影
  // 兼容好
  // box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  // 效果好，兼容差
  // drop-shadow(offset-x offset-y blur-radius spread-radius color)
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
  background-color: #fff;
  // 小三角
  &::before,
  &::after {
    content: ''; width: 0; height: 0;
    border: 10px solid transparent; 
  }
  // 不同位置
  &.position-top {
    margin-top: -10px;
    &::before {
        border-top-color: $border-color; 
        position: absolute; top: 100%;
    }
    &::after {
        border-top-color: #fff; 
        position: absolute; top: calc(100% - 1px);
    }
  }
  &.position-bottom {
    margin-top: 10px;
    &::before {
        border-bottom-color: $border-color; 
        position: absolute; bottom: 100%;
    }
    &::after {
        border-bottom-color: #fff; 
        position: absolute; bottom: calc(100% - 1px);
    }
  }
  &.position-left {
    margin-left: -10px;
    &::before,
    &::after {
       // 三角位于中间
       top: 50%; transform: translateY(-50%);
    }
    &::before {
        border-left-color: $border-color; 
        position: absolute; left: 100%;
    }
    &::after {
        border-left-color: #fff; 
        position: absolute; left: calc(100% - 1px);
    }
  }
  &.position-right {
    margin-left: 10px;
    &::before,
    &::after {
       // 三角位于中间
       top: 50%; transform: translateY(-50%);
    }
    &::before {
        border-right-color: $border-color; 
        position: absolute; right: 100%;
    }
    &::after {
        border-right-color: #fff; 
        position: absolute; right: calc(100% - 1px);
    }
  }
}
</style>