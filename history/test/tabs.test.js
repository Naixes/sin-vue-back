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

describe('Tabs', () => {
    it('存在', () => {
        expect(Tabs).to.exist
    })
    describe('Props', () => {
        it('可以设置selected', (done) => {
            // 创建组件
            let div = document.createElement('div')
            document.body.appendChild(div)
            div.innerHTML = `
            <s-tabs selected="finance">
                <s-tabs-header>
                    <s-tabs-item name="sports">运动</s-tabs-item>
                    <s-tabs-item name="finance">财经</s-tabs-item>
                </s-tabs-header>
                <s-tabs-body>
                    <s-tabs-panel name="sports">运动相关内容</s-tabs-panel>
                    <s-tabs-panel name="finance">财经相关内容</s-tabs-panel>
                </s-tabs-body>
            </s-tabs>
            `
            const vm = new Vue({
                el: div
            })
            // 需要重新渲染，不能直接测试
            vm.$nextTick(() => {
                let item = vm.$el.querySelector(".s-tabs-item[data-name='finance']")
                console.log(item)
                expect(item.classList.contains('active')).to.be.true
                done()
            })
        })

        it('可以设置direction', () => {
        })
    })
})