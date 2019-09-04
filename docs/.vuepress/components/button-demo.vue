<template>
    <div class="component-wrapper">
	    <s-button>默认按钮</s-button>
        <div class="dividing"></div>
        <s-button 
            icon="setting" 
            :loading="loading" 
            icon-position="right" 
        >带有图标的按钮</s-button>
        <s-button 
            icon="setting" 
            :loading="loading" 
            icon-position="left" 
        >带有图标的按钮</s-button>
        <div class="dividing"></div>
        <s-button-group>
            <s-button icon="left">上一页</s-button>
            <s-button>占位</s-button>
            <s-button icon="right" icon-position="right">下一页</s-button>
        </s-button-group>
    </div>
</template>

<script>
import Button from '../../../src/button';
export default {
    components: {
        's-button': Button
    }
}
</script>

<style lang="scss" scoped>
.component-wrapper {
    border: 1px solid #eee;
    margin: 2em 0;
    padding: 2em;
}
.dividing {    
    height: 1px;
    background-image: linear-gradient(90deg,#eee 0,#eee 70%,transparent 0); background-size: 15px 1px; background-repeat: repeat-x;
    margin: 1em 0;
}
</style>