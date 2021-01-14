import Vue from 'vue'
import Tabs from '../src/tabs'
import TabsHeader from '../src/tabsHeader'
import TabsBody from '../src/tabsBody'
import TabsItem from '../src/tabsItem'
import TabsPanel from '../src/tabsPanel'

Vue.component('s-tabs', Tabs)
Vue.component('s-tabs-header', TabsHeader)
Vue.component('s-tabs-body', TabsBody)
Vue.component('s-tabs-item', TabsItem)
Vue.component('s-tabs-panel', TabsPanel)

const expect = chai.expect

// 阻止启动生产消息
Vue.config.productionTip = false
Vue.config.devtools = false

describe('TabsItem', () => {
    it('存在', () => {
        expect(TabsItem).to.exist
    })
    describe('Props', () => {
        it('可以设置name', () => {
            const Constructor = Vue.extend(TabsItem)
            const vm = new Constructor({
                propsData: {
                    name: 'hello'
                }
            }).$mount()
            expect(vm.$el.getAttribute('data-name')).to.eq('hello')
        })

        it('可以设置disabled', () => {
            const Constructor = Vue.extend(TabsItem)
            const vm = new Constructor({
                propsData: {
                    disabled: true
                }
            }).$mount()
            expect(vm.$el.classList.contains('disabled')).to.be.true
            // 点击不会触发事件
            let cb = sinon.fake()
            vm.$on('click', cb)
            vm.$el.click()
            expect(cb).to.have.not.been.called
        })
    })
})