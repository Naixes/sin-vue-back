import Vue from 'vue'
// 引入要测试的组件
import Button from '@/button'
import chai, {expect} from 'chai'
import {mount} from '@vue/test-utils'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

// 阻止启动生产消息
Vue.config.productionTip = false
Vue.config.devtools = false

describe('Button', () => {
    it('存在', () => {
        expect(Button).to.exist
    })

	// 使用@vue/test-utils提供的方法
    it('可以设置icon', () => {
		// mount挂载组件，shallowMount 方法只挂载一个组件而不渲染其子组件
		const wrapper = mount(Button, {
			propsData: {
				icon: 'setting'
			}
		})
		// 可以获取实例vm
		// const vm = wrapper.vm
		// find获取元素
		let useEle = wrapper.find('use')
		// attributes获取属性，返回一个数组
		let href = useEle.attributes()['href']
		expect(href).to.eq('#i-setting')
    })
    
    it('可以设置loading', () => {
		const wrapper = mount(Button, {
			propsData: {
				loading: true
			}
		})
		let useEle = wrapper.find('use')
		let href = useEle.attributes()['href']
		expect(href).to.eq('#i-loading')
    })
    
    xit('icon默认order为1', () => {
		const wrapper = mount(Button, {
			propsData: {
				icon: 'setting'
			}
		})
		const icon = wrapper.find('svg')
		expect(getComputedStyle(icon).order).to.be.eq('1')
    })
    
    xit('可以设置icon-position修改order为2', () => {
		const wrapper = mount(Button, {
			propsData: {
				icon: 'setting',
				iconPosition: 'right'
			}
		})
		const icon = wrapper.find('svg')
		expect(getComputedStyle(icon).order).to.be.eq('2')
    })
    
    it('点击button触发click事件', () => {
		const wrapper = mount(Button, {
			propsData: {
				icon: 'setting',
				iconPosition: 'right'
			}
		})
		const vm = wrapper.vm
		let spy = sinon.fake()
		vm.$on('click', spy)
		let button = wrapper.find('button')
		// 触发事件
		button.trigger('click')
		expect(spy).to.have.been.called
    })
})