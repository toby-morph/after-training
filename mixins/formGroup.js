const touchMap = new WeakMap()

export const formGroup = {
    props: {
        fieldName: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        instructions: {
            type: String,
            default: null,
        },
        feedback: {
            type: Array,
            default() {
                return []
            },
        },
        v: {
            type: Object,
            required: true,
        },
        fieldWrapperClasses: {
            type: Array,
            default() {
                return []
            },
        },
        autoFocus: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            uuid: this.$uuid.v4(),
            validationMsgs: {
                required: 'This field is required',
                email: 'Enter a valid email address',
                alpha: 'Must contain only letters',
                minLength: (minLengthAmount) =>
                    `Must be at least ${minLengthAmount} characters long`,
                maxLength: (maxLengthAmount) =>
                    `Must be no more than ${maxLengthAmount} characters long`,
            }
        }
    },
    computed: {
        formGroupRequired() {
            return !!('required' in this.v.$params || this.required)
        },
        formGroupFeedback() {
            const formGroupFeedback = []
            // if there is an error, populate the feedback with relevant msg from injected object this.validationMsgs
            if (this.v.$error) {
                if ('alpha' in this.v && !this.v.alpha) {
                    formGroupFeedback.push(this.validationMsgs.alpha)
                }
                if ('required' in this.v && !this.v.required) {
                    formGroupFeedback.push(this.validationMsgs.required)
                }
                if ('minLength' in this.v && !this.v.minLength) {
                    const minLengthAmount = this.v.$params.minLength.min
                    formGroupFeedback.push(
                        this.validationMsgs.minLength(minLengthAmount)
                    )
                }
                if ('maxLength' in this.v && !this.v.maxLength) {
                    const maxLengthAmount = this.v.$params.maxLength.max
                    formGroupFeedback.push(
                        this.validationMsgs.maxLength(maxLengthAmount)
                    )
                }
                if ('email' in this.v && !this.v.email) {
                    formGroupFeedback.push(this.validationMsgs.email)
                }
                return formGroupFeedback
            }
            // otherwise, default to whatever feedback has been sent through the 'feedback' prop
            return this.feedback ? this.feedback : []
        },
        validationStatus() {
            // if no validation rules set on this field return 'clean'
            if (Object.keys(this.v.$params).length > 0) {
                if (this.v.$error) {
                    return 'warning'
                }
                if (this.v.$dirty && !this.v.$error) {
                    return 'success'
                }
            }
            return 'clean'
        },
        fieldId() {
            return 'form-group-input-' + this.uuid
        },
        labelId() {
            return 'form-group-label-' + this.uuid
        },
        instructionsId() {
            return 'form-group-instructions-' + this.uuid
        },
        feedbackId() {
            return 'form-group-feedback-' + this.uuid
        },
        fieldAriaDescribedBy() {
            const inputAriaDescribedBy = []
            if (this.instructions) inputAriaDescribedBy.push(this.instructionsId)
            if (this.feedback) inputAriaDescribedBy.push(this.feedbackId)
            return inputAriaDescribedBy.length > 0 ? inputAriaDescribedBy.join(' ') : false
        },
    },
    methods: {
        delayTouch($v) {
            $v.$reset()
            if (touchMap.has($v)) {
                clearTimeout(touchMap.get($v))
            }
            touchMap.set($v, setTimeout($v.$touch, 1000))
        },
        onBlur() {
            if (this.formGroupRequired) {
                this.delayTouch(this.v)
            }
        },
    },
}
