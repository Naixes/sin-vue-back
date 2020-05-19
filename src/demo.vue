<template>
	<div id="demo">
		<!-- table -->
		<div class="box">
			{{tableSelected}}
			<s-table :height="400" checkable :selected.sync="tableSelected" :data-source="tableData" :columns="tableColumns" :loading="loading"></s-table>
		</div>
		<div class="box">
			<s-table loading :height="400" :data-source="tableData" :columns="tableColumns"></s-table>
		</div>
		<!-- pager -->
		<div class="box">
			<s-pager :total="6" :current.sync="currentPage"></s-pager>
		</div>
		<!-- nav -->
		<div class="box">
			<s-nav :selected.sync = "selectedNav">
				<s-nav-item name="home">首页</s-nav-item>
				<s-sub-nav name="product">
					<span slot="title">商品</span>
					<s-nav-item name="daily">日常用品</s-nav-item>
					<s-sub-nav name="electronic">
						<span slot="title">电子产品</span>
						<s-nav-item name="watch">手表</s-nav-item>
						<s-nav-item name="phone">手机</s-nav-item>
					</s-sub-nav>
				</s-sub-nav>
				<s-nav-item name="finance">财务</s-nav-item>
			</s-nav>
		</div>
		<div class="box" style="width:200px;">
			<s-nav :selected.sync = "selectedNav" vertical>
				<s-nav-item name="home">首页</s-nav-item>
				<s-sub-nav name="product">
					<span slot="title">商品</span>
					<s-nav-item name="daily">日常用品</s-nav-item>
					<s-sub-nav name="electronic">
						<span slot="title">电子产品</span>
						<s-nav-item name="watch">手表</s-nav-item>
						<s-nav-item name="phone">手机</s-nav-item>
					</s-sub-nav>
				</s-sub-nav>
				<s-nav-item name="finance">财务</s-nav-item>
			</s-nav>
		</div>
		<!-- slides -->
		<div class="box">
			<s-slides :selected.sync="selectedSlides">
				<s-slides-item name="1">
					<div style="height:300px;">1</div>
				</s-slides-item>
				<s-slides-item name="2">
					<div style="height:300px;">2</div>
				</s-slides-item>
				<s-slides-item name="3">
					<div style="height:300px;">3</div>
				</s-slides-item>
			</s-slides>
		</div>
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
			{{selectedCascader}}
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
    import SButton from './button'
    import SIcon from './icon'
    import SButtonGroup from './buttonGroup'
    import SInput from './input'
    import SRow from './row'
    import SCol from './col'
    import SLayout from './layout'
    import SHeader from './header'
    import SAside from './aside'
    import SContent from './content'
    import SFooter from './footer'
    import SToast from './toast'
    import STabs from './tabs'
    import STabsHeader from './tabsHeader'
    import STabsItem from './tabsItem'
    import STabsBody from './tabsBody'
    import STabsPanel from './tabsPanel'
    import SPopover from './popover'
    import SCollapse from './collapse'
    import SCollapseItem from './collapseItem'
    import SCascader from './cascader'
	import SCascaderItem from './cascaderItem'
    import SSlides from './slides'
	import SSlidesItem from './slidesItem'
    import SNav from './nav'
	import SNavItem from './navItem'
	import SSubNav from './subNav'
	import SPager from './pager'
	import STable from './table'

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
			}, 1500)
		})
	}

    export default {
        name: "demo",
        components: {
            SButton,
            SButtonGroup,

            SIcon,

            SInput,

            SRow,
            SCol,

            SLayout,
            SHeader,
            SAside,
            SContent,
            SFooter,

            SToast,

            STabs,
            STabsHeader,
            STabsItem,
            STabsBody,
            STabsPanel,

            SPopover,

            SCollapse,
            SCollapseItem,

            SCascader,
            SCascaderItem,

            SSlides,
            SSlidesItem,

            SNav,
            SNavItem,
			SSubNav,

			SPager,
			STable
        },
    data () {
      return {
		// table  
		tableSelected: [],
        tableColumns: [
          {text: '姓名', field: 'name', width: 100}, // 1
          {text: '分数', field: 'score'},
        ],
        orderBy: { // true - 开启排序，但是不确定asc desc
          score: 'desc'
        },
        loading: false,
        tableData: [
          {id: 1, name: '方方', score: 100, description: 'xxxx xxxx'},
          {id: 2, name: '圆圆', score: 99, description: 'yyyy yyyy'},
          {id: 3, name: '张三', score: 100},
          {id: 4, name: '李四', score: 99},
          {id: 5, name: '超人', score: 100},
          {id: 6, name: '蝙蝠侠', score: 11},
          {id: 7, name: '蜘蛛侠', score: 3},
          {id: 8, name: '钢铁侠', score: 0},
          {id: 9, name: '方方', score: 100},
          {id: 10, name: '圆圆', score: 99},
          {id: 11, name: '张三', score: 100},
          {id: 12, name: '李四', score: 99},
          {id: 13, name: '超人', score: 100},
          {id: 14, name: '蝙蝠侠', score: 99},
          {id: 15, name: '蜘蛛侠', score: 100},
          {id: 16, name: '钢铁侠', score: 99},
          {id: 17, name: '蜘蛛侠', score: 100},
          {id: 18, name: '钢铁侠', score: 99},
          {id: 19, name: '方方', score: 100},
          {id: 20, name: '圆圆', score: 99},
        ],
		// pager
		currentPage: 1,
		// nav
		selectedNav: ['home'],
		// slides
		selectedSlides: '1',

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
			// console.log("updateSelected")
		},
		updateSource() {
			// console.log("updateSource")
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
