import Vue from 'vue'
import Toast from '../src/toast'

const expect = chai.expect

// 阻止启动生产消息
Vue.config.productionTip = false
Vue.config.devtools = false

describe('Toast', () => {
    it('存在', () => {
        expect(Toast).to.exist
    })
    describe('Props', () => {
        it('可以设置autoClose和delay', (done) => {
            const div = document.createElement('div')
            document.body.appendChild(div)
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    autoClose: true,
                    delay: 1
                }
            }).$mount(div)
            // 监听close方法
            vm.$on('close', () => {
                expect(document.body.contains(vm.$el)).to.eq(false)
                done()
                div.remove()
                vm.$destroy()
            })
        })

        it('可以设置buttonText', (done) => {
            const afterClose = sinon.fake()
            const div = document.createElement('div')
            document.body.appendChild(div)
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    buttonText: '关了吧',
                    afterClose
                }
            }).$mount(div)

            const closeButton = vm.$el.querySelector('.s-toast-close')
            expect(closeButton.textContent.trim()).to.eq('关了吧')
            setTimeout(() => {
                closeButton.click()
                expect(afterClose).to.have.been.called
                done()
                div.remove()
                vm.$destroy()
            }, 200)
        })

        it('可以设置position', () => {
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    position: 'bottom'
                }
            }).$mount()
            expect(vm.$el.classList.contains('position-bottom')).to.eq(true)
            vm.$el.remove()
            vm.$destroy()
        })

        it('可以设置html', () => {
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    html: '<p>this is a p</p>'
                }
            }).$mount()
            let p = vm.$el.querySelector('p')
            expect(p).to.exist
            vm.$el.remove()
            vm.$destroy()
        })
    })
})