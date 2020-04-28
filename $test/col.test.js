import Vue from 'vue'
import Col from '../src/col'

const expect = chai.expect

describe('Col', () => {
    it('存在', () => {
        expect(Col).to.exist
    })
    describe('Props', () => {
        const Constructor = Vue.extend(Col)

        let vm, div
        afterEach(() => {
            div.remove()
            vm.$destroy()
        })

        it('可以设置span', () => {
            div = document.createElement('div')
            document.body.appendChild(div)
            vm = new Constructor({
                propsData: {
                    span: 12
                }
            }).$mount(div)
            const col = vm.$el
            expect(col.classList.contains('col-12')).to.eq(true)
        })
        
        it('可以设置offset', () => {
            div = document.createElement('div')
            document.body.appendChild(div)
            vm = new Constructor({
                propsData: {
                    offset: 2
                }
            }).$mount(div)
            const col = vm.$el
            expect(col.classList.contains('offset-2')).to.eq(true)
            div.remove()
        })
        
        it('可以设置ipad', () => {
            div = document.createElement('div')
            document.body.appendChild(div)
            vm = new Constructor({
                propsData: {
                    ipad: {
                        span: 12,
                        offset: 2
                    }
                }
            }).$mount(div)
            const col = vm.$el
            expect(col.classList.contains('ipad-col-12')).to.eq(true)
            expect(col.classList.contains('ipad-offset-2')).to.eq(true)
            div.remove()
        })
        
        it('可以设置narrowPc', () => {
            div = document.createElement('div')
            document.body.appendChild(div)
            vm = new Constructor({
                propsData: {
                    narrowPc: {
                        span: 12,
                        offset: 2
                    }
                }
            }).$mount(div)
            const col = vm.$el
            expect(col.classList.contains('narrow-pc-col-12')).to.eq(true)
            expect(col.classList.contains('narrow-pc-offset-2')).to.eq(true)
            div.remove()
        })
        
        it('可以设置pc', () => {
            div = document.createElement('div')
            document.body.appendChild(div)
            vm = new Constructor({
                propsData: {
                    pc: {
                        span: 12,
                        offset: 2
                    }
                }
            }).$mount(div)
            const col = vm.$el
            expect(col.classList.contains('pc-col-12')).to.eq(true)
            expect(col.classList.contains('pc-offset-2')).to.eq(true)
            div.remove()
        })
        
        it('可以设置widePc', () => {
            div = document.createElement('div')
            document.body.appendChild(div)
            vm = new Constructor({
                propsData: {
                    widePc: {
                        span: 12,
                        offset: 2
                    }
                }
            }).$mount(div)
            const col = vm.$el
            expect(col.classList.contains('wide-pc-col-12')).to.eq(true)
            expect(col.classList.contains('wide-pc-offset-2')).to.eq(true)
            div.remove()
        })
        
        it('可以设置extra', () => {
            div = document.createElement('div')
            document.body.appendChild(div)
            vm = new Constructor({
                propsData: {
                    extra: {
                        span: 12,
                        offset: 2
                    }
                }
            }).$mount(div)
            const col = vm.$el
            expect(col.classList.contains('extra-col-12')).to.eq(true)
            expect(col.classList.contains('extra-offset-2')).to.eq(true)
            div.remove()
        })
    })
})