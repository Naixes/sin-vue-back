<template>
  <div class="s-popover" @click="toggle" ref="popover">
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
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    toggle(e) {
      // 点击的是触发器
      if (this.$refs.triggerWrapper.contains(e.target)) {
        if (this.visible) {
          this.close();
        } else {
          console.log(this.$refs.triggerWrapper.contains(e.target));
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
        document.addEventListener("click", this.clickHandle);
      });
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
      switch (this.position) {
        case "top":
          // 不受滚动的影响
          this.$refs.contentWrapper.style.left = left + window.scrollX + "px";
          this.$refs.contentWrapper.style.top = top + window.scrollY + "px";
          break;
        case "bottom":
          this.$refs.contentWrapper.style.left = left + window.scrollX + "px";
          this.$refs.contentWrapper.style.top =
            top + height * 2 + window.scrollY + "px";
          break;
        case "left":
          this.$refs.contentWrapper.style.left =
            left - contentWidth + window.scrollX + "px";
          this.$refs.contentWrapper.style.top =
            top + height + window.scrollY + "px";
          break;
        case "right":
          this.$refs.contentWrapper.style.left =
            left + width + window.scrollX + "px";
          this.$refs.contentWrapper.style.top =
            top + height + window.scrollY + "px";
          break;
      }
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
    // 收拢close方法
    close() {
      this.visible = false;
      document.removeEventListener("click", this.clickHandle);
    }
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
$border-color: #eee;
$border-radius: 4px;
.s-popover {
  display: inline-block;
  position: relative;
  .trigger-wrapper {
    display: inline-block;
  }
}
.s-popover-content-wrapper {
  // height: fit-content; // 防止绝对定位后没有高度
  position: absolute;
  bottom: 100%;
  left: 0;
  height: fit-content;
  transform: translateY(-100%);
  border: 1px solid $border-color;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  border-radius: $border-radius;
  padding: 0.5em 1em;
}
</style>