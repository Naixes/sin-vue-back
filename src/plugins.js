import Toast from './toast'

let currentToast

export default {
    install(Vue, options) {
        // 向Vue原型中添加方法
        Vue.prototype.$toast = function(tip, toastOptions) {
            console.log('toast msg', tip)
            console.log('currentToast', currentToast)
            // 保证当前只有一个toast
            if(currentToast) {
                currentToast.close()
            }
            currentToast = createToast(Vue, tip, toastOptions)
            console.log('currentToast', currentToast)
        }
    }
}

let createToast = function(Vue, tip, toastOptions) {
    let Constructor = Vue.extend(Toast)
    let toast = new Constructor({
        propsData: toastOptions
    })
    // 传递slot
    toast.$slots.default = [tip]
    // 内存中挂载
    toast.$mount()
    document.body.appendChild(toast.$el)

    return toast
}