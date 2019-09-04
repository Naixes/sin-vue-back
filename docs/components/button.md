---
title: Button
---

# 按钮

## 使用方法

<!-- 在md中使用vue组件：直接使用.vuepress/components下组件的文件名作为标签名 -->
<!-- <ClientOnly> -->
<button-demo></button-demo>
<!-- </ClientOnly> -->
```javascript
<s-button>默认按钮</s-button>
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
<s-button-group>
    <s-button icon="left">上一页</s-button>
    <s-button>占位</s-button>
    <s-button icon="right" icon-position="right">下一页</s-button>
</s-button-group>
```