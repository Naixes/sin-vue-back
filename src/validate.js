class Validator {
    constructor() {}
    validate(data, rules) {
        console.log(data, rules)
        let errors = {}
        rules.forEach(rule => {
            let value = data[rule.key]
            // 必填
            if(rule.required) {
                let error = this.required(value)
                if(error) {
                    ensureObject(errors, rule.key)
                    errors[rule.key].required = error
                    return
                }
            }
            // 获取其他校验项
            let validators = Object.keys(rule).filter(key => key !== 'key' && key !== 'required')

            validators.forEach(validator => {
                if(this[validator]) {
                    let error = this[validator](value, rule[validator])
                    if(error) {
                        ensureObject(errors, rule.key)
                        errors[rule.key][validator] = error
                    }
                        
                }else {
                    throw `不存在的校验器${validator}`
                }
            })
        });
        return errors
    }

    required(value) {
        if(value !== 0 && !value) {
            return '必填'
        }
    }
    
    minlength(value, minlength) {
        if(value.length < minlength) {
            return '短了'
        }
    }
    
    maxlength(value, maxlength) {
        if(value.length < maxlength) {
            return '长了'
        }
    }

    pattern(value, pattern) {
        if (pattern === 'email') {
          pattern = /^.+@.+$/
        }
        if (pattern.test(value) === false) {
          return '格式不正确'
        }
    }
}

function ensureObject (obj, key) {
  if (typeof obj[key] !== 'object') {
    obj[key] = {}
  }
}

export default Validator
