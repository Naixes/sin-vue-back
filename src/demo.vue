<template>
	<div id="demo">
		<!-- cascader -->
		<!-- 动态 -->
		<div class="box">
			<s-cascader
				:source.sync="cascaderSource" 
				:selected.sync="selectedCascader"
				:loadSource="loadSource"
				@update:selected="updateSelected"
				@update:source="updateSource"
			>
			</s-cascader>
			{{cascaderSource}}
		</div>
		<!-- 静态 -->
		<div class="box">
			<s-cascader
				:source.sync="defaultCascaderSource" 
				:selected.sync="defaultSelectedCascader"
				@update:selected="updateSelected"
				@update:source="updateSource"
			>
			</s-cascader>
			{{defaultCascaderSource}}
		</div>
		<!-- collapse -->
		<div class="box">
			<s-collapse :selected.sync="selectedCollapse" single>
				<s-collapse-item name="1" title="标题1">内容1</s-collapse-item>
				<s-collapse-item name="2" title="标题2">内容2</s-collapse-item>
				<s-collapse-item name="3" title="标题3">内容3</s-collapse-item>
			</s-collapse>
		</div>
		<!-- <div class="box">
			<s-collapse :selected.sync="selectedCollapse">
				<s-collapse-item name="1" title="标题1">内容1</s-collapse-item>
				<s-collapse-item name="2" title="标题2">内容2</s-collapse-item>
				<s-collapse-item name="3" title="标题3">内容3</s-collapse-item>
			</s-collapse>
		</div> -->
		<!-- popover -->
		<div class="box" style="overflow: hidden; margin-top: 100px;">
			<s-popover position="top" trigger="click">
				<template slot="content" slot-scope="{close}">
					<div>你点了我你点了我你点了我你点了我你点了我你点了我你点了我你点了我你点了我你点了我你点了我你点了我你点了我</div>
					<s-button @click="close">关闭</s-button>
				</template>
				<s-button>点呀</s-button>
			</s-popover>
			<s-popover position="bottom" trigger="hover">
				<template slot="content" slot-scope="{close}">
					<div>你点了我你点了我你点了我你点了我你点了我你点了了我你点了我你点了我你点了我你点了我你点了我你点了我</div>
					<s-button @click="close">关闭</s-button>
				</template>
				<s-button>点呀</s-button>
			</s-popover>
			<s-popover position="left">
				<template slot="content" slot-scope="{close}">
					<div>你点了我你点了我你点了我你点了我你点了我你点了我了我你点了我你点了我你点了我你点了我你点了我你点了我</div>
					<s-button @click="close">关闭</s-button>
				</template>
				<s-button>点呀</s-button>
			</s-popover>
			<s-popover position="right">
				<template slot="content" slot-scope="{close}">
					<div>你点了我你点了我你点了我你点了我你点了我你点了我你点了我你点了我你点了我你点了我你点了我点了我你点了我</div>
					<s-button @click="close">关闭</s-button>
				</template>
				<s-button>点呀</s-button>
			</s-popover>
		</div>
		<!-- tabs -->
		<div class="box">
			<s-tabs :selected="tabsSelected" direction="vertical">
				<s-tabs-header>
					<s-tabs-item name="sports">
						<s-icon name="setting"></s-icon>
						运动
					</s-tabs-item>
					<s-tabs-item name="error">
						<s-icon name="error"></s-icon>
						hahah
					</s-tabs-item>
					<s-tabs-item name="finance" disabled>财经</s-tabs-item>
					<s-button slot="action">按钮</s-button>
					<s-button slot="action">按钮</s-button>
					<s-button slot="action">按钮</s-button>
				</s-tabs-header>
				<s-tabs-body>
					<s-tabs-panel name="sports">运动相关内容</s-tabs-panel>
					<s-tabs-panel name="error">出错出错</s-tabs-panel>
					<s-tabs-panel name="finance">财经相关内容</s-tabs-panel>
				</s-tabs-body>
			</s-tabs>
		</div>

		<!-- toast -->
		<div class="box">
			<s-button @click="showToast({position: 'top'})">测试toast按钮上</s-button>
			<s-button @click="showToast({position: 'middle'})">测试toast按钮中</s-button>
			<s-button @click="showToast({position: 'bottom'})">测试toast按钮下</s-button>
		</div>

		<!-- 布局1 -->
		<div class="box">
			<s-layout style="height: 100vh">
				<s-header class="header">header</s-header>
				<s-content class="content">content</s-content>
				<s-footer class="footer">footer</s-footer>
			</s-layout>
		</div>

		<!-- 布局2 -->
		<div class="box">
			<s-layout style="height: 100vh">
				<s-header class="header">header</s-header>
				<s-layout>
					<s-aside class="aside">aside</s-aside>
					<s-content class="content">content</s-content>
				</s-layout>
				<s-footer class="footer">footer</s-footer>
			</s-layout>
		</div>

		<!-- 布局3 -->
		<div class="box">
			<s-layout style="height: 100vh">
				<s-aside class="aside">aside</s-aside>
				<s-layout>
					<s-header class="header">header</s-header>
					<s-content class="content">content</s-content>
					<s-footer class="footer">footer</s-footer>
				</s-layout>
			</s-layout>
		</div>

		<!-- col,row -->
		<div class="box">
			<s-row>
				<s-col>1</s-col>
				<s-col>2</s-col>
				<s-col>3</s-col>
			</s-row>
			<s-row gutter="10">
				<s-col span="4">1</s-col>
				<s-col span="16">2</s-col>
				<s-col span="4">3</s-col>
			</s-row>
			<s-row gutter="10">
				<s-col span="2" offset="2">1</s-col>
				<s-col span="16">2</s-col>
				<s-col span="2" offset="2">3</s-col>
			</s-row>
			<s-row gutter="10" align="center">
				<s-col span="2">1</s-col>
				<s-col span="2">2</s-col>
				<s-col span="2">3</s-col>
			</s-row>
			<s-row gutter="10">
				<!-- 默认为phone的样式：移动端优先 -->
				<s-col 
					span="24"
					:ipad="{span: 12}"
					:narrow-pc="{span: 6}"
					:pc="{span: 4}"
					:wide-pc="{span: 2}"
					:extra="{span: 1}"
				>1</s-col>
				<s-col 
					span="24"
					:ipad="{span: 12}"
					:narrow-pc="{span: 18}"
					:pc="{span: 20}"
					:wide-pc="{span: 22}"
					:extra="{span: 23}"
				>2</s-col>
			</s-row>
		</div>

		<!-- input -->
		<div class="box">
			<!-- vue中自定义组件不要自闭合 -->
			<s-input placeholder="请输入"></s-input>
			<s-input value="姓名" :disabled="true"></s-input>
			<s-input value="姓名" :readonly="true"></s-input>
			<s-input value="姓名" placeholder="请输入"></s-input>
			<s-input error="必须大于3个字"></s-input>
			<!-- $event 已经被value覆盖 -->
			<s-input
				placeholder="请输入"
				@change="eventHandle('change', $event )"
				@input="eventHandle('input', $event)"
				@focus="eventHandle('focus', $event)"
				@blur="eventHandle('blur', $event)"
			></s-input>
			<s-input placeholder="请输入" v-model="msg"></s-input>
			{{msg}}
		</div>

		<!-- 按钮 -->
		<div class="box">
			<s-button>按钮</s-button>

			<!-- 带有图标的按钮 -->
			<s-button 
				icon="setting" 
				:loading="loading" 
				icon-position="right" 
				@click="loading = !loading"
			>按钮</s-button>
		</div>

		<!-- 按钮组 -->
		<div class="box">
			<s-button-group>
				<s-button icon="left">上一页</s-button>
				<s-button>占位</s-button>
				<s-button icon="right" icon-position="right">下一页</s-button>
			</s-button-group>
		</div>

		<!-- icon -->
		<div class="box">
			<s-icon name="loading"></s-icon>
		</div>
		
	</div>
</template>
<script>
    import Vue from 'vue'
    import Button from './button'
    import Icon from './icon'
    import ButtonGroup from './buttonGroup'
    import Input from './input'
    import Row from './row'
    import Col from './col'
    import Layout from './layout'
    import Header from './header'
    import Aside from './aside'
    import Content from './content'
    import Footer from './footer'
    import Toast from './toast'
    import Tabs from './tabs'
    import TabsHeader from './tabsHeader'
    import TabsItem from './tabsItem'
    import TabsBody from './tabsBody'
    import TabsPanel from './tabsPanel'
    import Popover from './popover'
    import Collapse from './collapse'
    import CollapseItem from './collapseItem'
    import Cascader from './cascader'
	import CascaderItem from './cascaderItem'

	import db from './db'
	
	// 模拟数据获取
	function getArea(parentId = 0) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let result = db.filter(ele => ele.parent_id === parentId)
				resolve(result)
				result.forEach(ele => {
					if(db.filter(item => item.parent_id === ele.id).length > 0) {
						ele.isLeaf = false
					}else {
						ele.isLeaf = true
					}
				})
			}, 500)
		})
	}

    export default {
        name: "demo",
        components: {

            's-button': Button,
            's-button-group': ButtonGroup,

            's-icon': Icon,

            's-input': Input,

            's-row': Row,
            's-col': Col,

            's-layout': Layout,
            's-header': Header,
            's-aside': Aside,
            's-content': Content,
            's-footer': Footer,

            's-toast': Toast,

            's-tabs': Tabs,
            's-tabs-header': TabsHeader,
            's-tabs-item': TabsItem,
            's-tabs-body': TabsBody,
            's-tabs-panel': TabsPanel,

            's-popover': Popover,

            's-collapse': Collapse,
            's-collapse-item': CollapseItem,

            's-cascader': Cascader,
            's-cascader-item': CascaderItem
        },
    data () {
      return {
		loading: false,
		msg: 'hi',
		tabsSelected: 'sports',
		selectedCollapse: ['1', '2'],
		// [{第一层选择的数据}， {第二层}， {第三层}]
		selectedCascader: [],
		defaultSelectedCascader: [],
		// 下拉展示的数据，[{}，{}]，所有数据都在第一层
		cascaderSource: [],
		defaultCascaderSource: [
			{
				name: '浙江',
				children: [
					{
						name: '杭州',
						children: [
							{name: '上城'},
							{name: '下城'},
							{name: '江干'},
						]
					},
					{
						name: '嘉兴',
						children: [
							{name: '南湖'},
							{name: '秀洲'},
							{name: '嘉善'},
						]
					},
				]
		  }, {
			name: '福建',
			children: [
				{
					name: '福州',
					children: [
						{name: '鼓楼'},
						{name: '台江'},
						{name: '仓山'},
					]
				},
			]
		  }
		]
      };
	},
	created() {
		getArea().then(result => {
			this.cascaderSource = result
		})
	},
    methods: {
		// cascader
		// 查询当前元素的子元素，传给子组件，子组件调用
		loadSource(parentId, updateSource) {
			getArea(parentId).then(result => {
				// 执行回调
				updateSource(result)
			})
		},
		// 先更新selected，再更新source
		updateSelected() {
			console.log("updateSelected")
		},
		updateSource() {
			console.log("updateSource")
		},
		eventHandle(type, e) {
			console.log(type, e)
		},
		showToast(options) {
			// 如果是连续字母的话不会换行。。。
			this.$toast('他真的知道了他真的知道了他真的知道了他真的知道了他真的知道了他真的知道了', {
				// autoClose: false,
				buttonText: '知道了',
				afterClose() {
					console.log('他真的知道了')
				},
				html: `<strong>我是html</strong>`,
				...options
			})
		}
    }
  };
</script>
<style>
    * {margin: 0; padding: 0; box-sizing: border-box;}
    /* 已改为sass变量 */
    /* :root { */
        /* --font-size: 14px ;

        --color: #333;
        --border-color: #999;
        --border-hover-color: #666; */
        /* --border-hover-color: red; */

        /* --button-height: 32px;
        --button-bgc: #fff;
        --button-radius: 4px;
        --button-active-bgc: #eee; */
    /* } */

    /* 公共样式 */
    li {
        list-style: none;
    }

    /* 测试样式 */
    #demo {
        margin: 20px;
    }
    body {
        font-size: var(--font-size);
    }
    .box {
        margin: 20px;
    }
    .s-col {
        height: 40px;
        background-color: #eee;
        border: 1px solid #ccc;
    }
    /* 布局 */
    .content {
        background-color: #eee;
    }
    .header {
        background-color: #ccc;
        height: 100px;
    }
    .footer {
        background-color: #ccc;
        height: 100px;
    }
    .aside {
        width: 150px;
        background-color: #aaa;
    }
    .s-tabs-body {
        padding: 10px 20px;
    }
</style>
