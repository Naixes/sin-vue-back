import Toast from './toast'

export default {
    install(Vue, options) {
        // 向Vue原型中添加方法
        Vue.prototype.$toast = function(tip) {
            console.log(tip)
            let Constructor = Vue.extend(Toast)
            let toast = new Constructor()
            toast.$slots.default = [tip]
            // 内存中挂载
            toast.$mount()
            document.body.appendChild(toast.$el)
        }
    }
}