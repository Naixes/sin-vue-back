import Vue from 'vue'
// 引入要测试的组件
import Button from '../src/button'

const expect = chai.expect

// 阻止启动生产消息
Vue.config.productionTip = false
Vue.config.devtools = false

describe('Button', () => {
    it('存在', () => {
        expect(Button).to.exist
    })

    it('可以设置icon', () => {
		// 获取组件构造函数
		const Constructor = Vue.extend(Button)
		// 创建测试实例
		const vm = new Constructor({
			// propsData 可以传递组件属性
			propsData: {
				icon: 'setting'
			}
		})
		vm.$mount()
		let useEle = vm.$el.querySelector('use')
		let href = useEle.getAttribute('xlink:href')
		expect(href).to.eq('#i-setting')
		// 销毁实例
		vm.$el.remove()
		vm.$destroy()
    })
    
    it('可以设置loading', () => {
		const Constructor = Vue.extend(Button)
		const vm = new Constructor({
			propsData: {
				loading: true
			}
		})
		vm.$mount()
		let useEle = vm.$el.querySelector('use')
		let href = useEle.getAttribute('xlink:href')
		expect(href).to.eq('#i-loading')
		vm.$el.remove()
		vm.$destroy()
    })
    
    it('icon默认order为1', () => {
		// css 属性需要渲染到页面
		const div = document.createElement('div')
		document.body.appendChild(div)
	
		const Constructor = Vue.extend(Button)
		const vm = new Constructor({
			propsData: {
				icon: 'setting'
			}
		})
		// 渲染组件
		vm.$mount(div)
		let svg = vm.$el.querySelector('svg')
		// window.getComputedStyle()：返回对象，包含元素的所有CSS属性的值。
		let {order} = window.getComputedStyle(svg)
		expect(order).to.eq('1')
		vm.$el.remove()
		vm.$destroy()
    })
    
    it('可以设置icon-position修改order为2', () => {
		const div = document.createElement('div')
		document.body.appendChild(div)
	
		const Constructor = Vue.extend(Button)
		const vm = new Constructor({
			propsData: {
				icon: 'setting',
				iconPosition: 'right'
			}
		})
		vm.$mount(div)
		let svg = vm.$el.querySelector('svg')
		let {order} = window.getComputedStyle(svg)
		expect(order).to.eq('2')
		vm.$el.remove()
		vm.$destroy()
    })
    
    it('点击button触发click事件', () => {
		const Constructor = Vue.extend(Button)
		const vm = new Constructor({
			propsData: {
				icon: 'setting',
				iconPosition: 'right'
			}
		})
        vm.$mount()
        
		let spy = sinon.fake()
		vm.$on('click', spy)
		let button = vm.$el
		// 触发事件
		button.click()
		expect(spy).to.have.been.called
	
		vm.$el.remove()
		vm.$destroy()
    })
})