<template>
  <div class="s-form-row">
      <label>{{label}}：</label>
      <slot></slot>
      <p>{{error && Object.values(error)[0]}}</p>
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
.s-form-row {
    margin-bottom: 16px;
}
</style>