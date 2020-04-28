import Vue from 'vue'
import Row from '../src/row'
import Col from '../src/col'

const expect = chai.expect

// 阻止启动生产消息
Vue.config.productionTip = false
Vue.config.devtools = false

describe('Row', () => {
    it('存在', () => {
        expect(Row).to.exist
    })
    describe('Props', () => {
        it('可以设置gutter', (done) => {
            // 创建组件
            Vue.component('s-row', Row)
            Vue.component('s-col', Col)
            const div = document.createElement('div')
            document.body.appendChild(div)
            div.innerHTML = `
                <s-row gutter="10">
                    <s-col span="12"></s-col>
                    <s-col span="12"></s-col>
                </s-row>
            `
            // 创建Vue实例
            const vm = new Vue({
                el: div
            })
            // 需要重新渲染，不能直接测试
            setTimeout(() => {
                const row = vm.$el.querySelector('.s-row')
                expect(getComputedStyle(row).marginLeft).to.eq('-5px')
                expect(getComputedStyle(row).marginRight).to.eq('-5px')
                const cols = vm.$el.querySelectorAll('.s-col-wrapper')
                expect(getComputedStyle(cols[0]).paddingLeft).to.eq('5px')
                expect(getComputedStyle(cols[1]).paddingRight).to.eq('5px')
                done()
                vm.$el.remove()
                vm.$destroy()
            })
        })

        it('可以设置align属性', () => {
            const div = document.createElement('div')
            document.body.appendChild(div)
            const Constructor = Vue.extend(Row)
            const vm = new Constructor({
                propsData: {
                    align: 'center'
                }
            }).$mount(div)
            const row = vm.$el
            expect(getComputedStyle(row).justifyContent).to.eq('center')
            div.remove()
            vm.$destroy()
        })
    })
})