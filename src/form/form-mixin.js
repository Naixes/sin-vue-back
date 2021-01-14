import Validator from '../validate'
export default {
    data() {
        return {
            errors: {},
            validator: new Validator()
        }
    },
    methods: {
        validate(formData) {
            const rules = this.rules
            this.errors = this.validator.validate(formData, rules)
        }
    }
}