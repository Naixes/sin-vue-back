<template>
    <div class="s-cascader-item">
        <!-- 左右布局 -->
        <ul class="s-cascader-left">
            <li
                class="item"
                v-for="(item, index) in sourceItem"
                :key="index"
                @click="select(item)"
            >
                {{item.name}}
                <s-icon
                    v-if="item.children"
                    class="arrow"
                    name="right"
                ></s-icon>
            </li>
        </ul>
        <div v-if="rightItem" class="s-cascader-right">
            <!-- 递归组件 -->
            <cascader-item :sourceItem="rightItem">
            </cascader-item>
        </div>
    </div>
</template>
<script>
import Icon from './icon'

export default {
    name: 'CascaderItem',
	components: {
		's-icon': Icon
	},
    props: {
        sourceItem: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        rightItem() {
            if(this.leftSelected && this.leftSelected.children) {
                return this.leftSelected.children
            }
            return null
        }
    },
    data() {
        return {
            leftSelected: ''
        }
    },
    methods: {
        select(item) {
            this.leftSelected = item
        }
    }
}
</script>

<style lang="scss">
.s-cascader-item {
    display: flex;
    .item {
        display: flex;
        align-items: center;
        .arrow {
            transform: scale(.5)
        }
    }
}
</style> 