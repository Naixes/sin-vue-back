<template>
  <div class="s-table-wrapper">
      <div :style="{height: `${height}px`, overflow: 'auto'}">
        <table class="s-table" :class="{striped}">
            <thead>
                <tr>
                    <!-- 展开项：占位 -->
                    <th :style="{width: '50px'}" v-if="expendField"></th>
                    <!-- 勾选框 -->
                    <th :style="{width: '50px'}" v-if="checkable">
                        <input @change="checkAll" type="checkbox" :checked="isAllChecked">
                    </th>
                    <th v-for="column in columns" :key="column.field">{{column.text}}</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="data in dataSource">
                    <tr :key="data.id">
                        <!-- 展开按钮 -->
                        <td :style="{width: '50px'}" v-if="expendField">
                            <s-icon name="right" @click="expendItem(data.id)"></s-icon>
                        </td>
                        <!-- 勾选框 -->
                        <td :style="{width: '50px'}" v-if="checkable">
                            <input @change="checkItem(data, $event)" type="checkbox" :checked="isChecked(data)">
                        </td>
                        <td :style="{width: `${column.width}px`}" v-for="column in columns" :key="column.field">{{data[column.field]}}</td>
                    </tr>
                    <!-- 展开内容 -->
                    <tr v-if="isExpend(data.id)" :key="`${data.id}-expend`">
                        <td :colspan="expendedCellColSpan">{{data[expendField] || '-'}}</td>
                    </tr>
                </template>
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
      // 可展开项的字段名  
      expendField: {
          type: String,
      },
      // 选中项
      selected: {
          type: Array,
          default: () => ([])
      },
      // 是否可勾选
      checkable: {
          type: Boolean,
          default: false
      },
      // 条纹
      striped: {
          type: Boolean,
          default: true
      },
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
  computed: {
      // 根据id判断是否全选  
      isAllChecked() {
          const dataSourceIds = this.dataSource.map(item => item.id).sort()
          const selectedIds = this.selected.map(item => item.id).sort()
          if(dataSourceIds.length !== selectedIds.length) { return false}
          let equal = true
          for (let index = 0; index < dataSourceIds.length; index++) {
              if(dataSourceIds[index] !== selectedIds[index]) {
                  equal = false
                  break
              }
          }
          return equal
      },
      // 扩展项所占列数  
      expendedCellColSpan() {
          let span = this.columns.length
          if(this.checkable) {span += 1}
          if(this.expendField) {span += 1}
          return span
      }
  },
  data() { 
    return {
        // 展开项的id数组
        expendIds: []
    }
  },
  methods: {
      isExpend(id) {
          return this.expendIds.some(i => i === id)
      },
      expendItem(id) {
          if(this.isExpend(id)) {
              this.expendIds.splice(this.expendIds.indexOf(id), 1)
          }else {
              this.expendIds.push(id)
          }
      },
      isChecked(item) {
          return this.selected.filter(i => i.id === item.id).length > 0
      },
      checkItem(item, e) {
          let isChecked = e.target.checked
          let copySelected = JSON.parse(JSON.stringify(this.selected))
          if(isChecked) {
              copySelected.push(item)
          }else {
              copySelected = copySelected.filter(i => i.id !== item.id)
          }
          this.$emit('update:selected', copySelected)
      },
      checkAll(e) {
          this.$emit('update:selected', e.target.checked ? this.dataSource : [])
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
            border-bottom: 1px solid $border-color-lighter;
            padding: 8px;
        }
        td {
            .s-icon {
                width: $icon-width;
                height: $icon-height;
                margin: $icon-margin;
                cursor: pointer;
            }
        }
        // 条纹
        &.striped {
            tbody {
                >tr {
                    &:nth-child(odd) {
                        background: white;
                    }
                    &:nth-child(even) {
                        // lighten：增加颜色亮度
                        background: lighten($border-color-lighter, 10%);
                    }
                }
            }
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
        .s-icon {
            width: 50px;
            height: 50px;
            @include spin;
        }
    }
}
</style>