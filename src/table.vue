<template>
  <div class="s-table-wrapper">
      <div :style="{height: `${height}px`, overflow: 'auto'}">
        <table class="s-table">
            <thead>
                <tr>
                    <th v-for="column in columns" :key="column.field">{{column.text}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in dataSource" :key="data.id">
                    <td v-for="column in columns" :key="column.field">{{data[column.field]}}</td>
                </tr>
            </tbody>
        </table>
      </div>
      <div v-if="loading" class="s-table-loading">
          <s-icon name="loading"></s-icon>
      </div>
  </div>
</template>

<script>
import SIcon from './icon'

export default {
  name: '',
  components: {
      SIcon
  },
  props: {
      height: {
          type: Number
      },
      loading: {
          type: Boolean,
          default: false
      },
      columns: {
          type: Array,
          required: true
      },
      dataSource: {
          type: Array,
          required: true,
          validator(array) {
              return !(array.filter(item => item.id === undefined).length > 0)
          }
      }
  },
  data() { 
    return {

    }
  }
 }
</script>

<style lang="scss" scoped>
@import "var";

.s-table-wrapper{
    position: relative;
    .s-table {
        width: 100%;
        border-collapse: collapse;
        th {
            text-align: left;
        }
        th, td {
            border-bottom: 1px solid $border-color;
            padding: 8px;
        }
    }
    .s-table-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        background: rgba(255, 255, 255, .6);
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        svg {
            width: 50px;
            height: 50px;
            @include spin;
        }
    }
}
</style>