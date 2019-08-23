import Toast from './toast'

let currentToast

export default {
    install(Vue, options) {
        // 向Vue原型中添加方法
        Vue.prototype.$toast = function(tip, toastOptions) {
            console.log('toast msg', tip)
            // 保证当前只有一个toast
            if(currentToast) {
                currentToast.close()
                // close中清除了currentToast
                console.log('currentToast', currentToast)
            }
            currentToast = createToast({
                Vue, 
                tip, 
                propsData: toastOptions, 
                onClose: () => {
                    currentToast = null
                }
            })
            // console.log('currentToast', currentToast)
        }
    }
}

let createToast = function({Vue, tip, propsData, onClose}) {
    console.log(propsData)
    let Constructor = Vue.extend(Toast)
    let toast = new Constructor({
        propsData
    })
    // 传递slot
    !propsData.html && (toast.$slots.default = [tip])
    // 内存中挂载
    toast.$mount()
    // 相当于@close = onClose
    toast.$on('close', onClose)
    document.body.appendChild(toast.$el)

    return toast
}