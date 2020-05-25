<template>
  <div class="s-form-row">
      <label>{{label}}：</label>
      <slot></slot>
      <p class="s-form-row-err">{{error && Object.values(error)[0]}}</p>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
      label: {
          type: String
      },
      error: {
          type: Object
      }
  },
  data() { 
    return {

    }
  }
 }
</script>

<style lang="scss" scoped>
@import 'var';

.s-form-row {
    margin-bottom: 16px;
    &-err {
        position: absolute;
        color: $red;
        margin: 0;
        font-size: 12px;
    }
}
</style>