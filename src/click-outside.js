export default {
    inserted(el, bindings) {
        el.onclickDocument = e => {
            // console.log('onclickDocument')
            let {target} = e
            if(el === target || el.contains(target)) {
                return
            }
            // console.log('bindings', bindings)
            bindings.value()
        }
        document.addEventListener('click', el.onclickDocument)
    },
    unbind(el) {        
        document.removeEventListener('click', el.onclickDocument)
    }
}