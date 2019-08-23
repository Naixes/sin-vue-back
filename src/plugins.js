import Toast from './toast'

export default {
    install(Vue, options) {
        // 向Vue原型中添加方法
        Vue.prototype.$toast = function(tip, toastOptions) {
            console.log('toast msg', tip)
            let Constructor = Vue.extend(Toast)
            let toast = new Constructor({
                propsData: toastOptions
            })
            // 传递slot
            toast.$slots.default = [tip]
            // 内存中挂载
            toast.$mount()
            document.body.appendChild(toast.$el)
        }
    }
}