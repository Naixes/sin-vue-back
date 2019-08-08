import Vue from 'vue'
// 引入要测试的组件
import Input from '../src/input'

const expect = chai.expect

// 阻止启动生产消息
Vue.config.productionTip = false
Vue.config.devtools = false

describe('Input', () => {
    it('存在', () => {
        expect(Input).to.exist
    })

    describe('Props', () => {
        // 获取组件构造函数
        const Constructor = Vue.extend(Input)

				// 提升vm作用域
        let vm
				// 在每一个测试用例之后
        afterEach(() => {
            // 销毁实例
            vm.$el.remove()
            vm.$destroy()
        })
    
        // 可以将属性测试封装！！！
        it('可以设置value', () => {
            // 创建测试实例
            vm = new Constructor({
                // propsData 可以传递组件属性
                propsData: {
                    value: 'xxx'
                }
            }).$mount()
            let inputEle = vm.$el.querySelector('input')
            // 可以直接用点
            expect(inputEle.value).to.eq('xxx')
        })
        
        it('可以设置disabled', () => {
            vm = new Constructor({
                propsData: {
                    disabled: true
                }
            }).$mount()
            let inputEle = vm.$el.querySelector('input')
            // let disabled = inputEle.getAttribute('disabled')
						// expect(disabled).to.eq('disabled')
            expect(inputEle.disabled).to.eq(true)
        })
        
        it('可以设置readonly', () => {
            vm = new Constructor({
                propsData: {
                    readonly: true
                }
            }).$mount()
            let inputEle = vm.$el.querySelector('input')
            // let readonly = inputEle.getAttribute('readonly')
            // expect(readonly).to.eq('readonly')
            expect(inputEle.readOnly).to.eq(true)
        })
        
        it('可以设置placeholder', () => {
            vm = new Constructor({
                propsData: {
                    placeholder: '请输入'
                }
            }).$mount()
            let inputEle = vm.$el.querySelector('input')
            expect(inputEle.placeholder).to.eq('请输入')
        })
        
        it('可以设置error', () => {
            vm = new Constructor({
                propsData: {
										error: 'error',
                }
            }).$mount()
						let useEle = vm.$el.querySelector('inuseput')
						let errMsgEle = vm.$el.querySelector('inuseput')
						let href = useEle.getAttribute('err-msg')
            expect(href).to.eq('#i-errpr')
            expect(errMsgEle.innerHTML).to.eq('error')
        })
    })
    describe('事件', () => {
        let vm
        afterEach(() => {
            vm.$destroy()
        })
        // 获取组件构造函数
        const Constructor = Vue.extend(Input)
        it('支持input，change，focus，blur事件', () => {
            ['change', 'input', 'focus', 'blur'].forEach(eventName => {
                vm = new Constructor({}).$mount()
								let spy = sinon.fake()
								// 绑定事件
								vm.$on(eventName, spy)
								
                // 声明一个事件对象，手动创建的事件所以它的isTrusted: false，也没有target
								let event = new Event(eventName)
								// 设置target及value，不能直接设target，target是一个只读属性
                Object.defineProperty(
                    event, 'target', {
                        value: {value: 'hi'},
                        // 可枚举
                        enumerable:true
                    }
                )
                let inputEle = vm.$el.querySelector('input')
                // 触发事件
                inputEle.dispatchEvent(event)
                // 在sinon-chai的文档中，karma中引入的sinon-chai，查看karma.conf.js
								// expect(spy).to.have.been.calledWith(event)
								// 兼容v-model
                expect(spy).to.have.been.calledWith('hi')
            })
        })
    })
})