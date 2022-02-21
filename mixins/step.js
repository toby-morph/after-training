import { mapState } from 'vuex'

export const step = {
    computed: {
        ...mapState({
            currentStepsStrapline: (state) => state.steps.currentStepsStrapline,
        }),
        hasContentList() {
            const stepObj = this.step
            return 'page_content_list' in stepObj && JSON.parse(stepObj.page_content_list.has_content_list)
        },
        metaTitle() {
            return this.step.step_metadata.html_title
                ? this.step.step_metadata.html_title
                : this.step.step_title
        },
        strapline() {
            let strapline = null
            if (this.step.step_strapline) {
                strapline = this.step.step_strapline
            } else if (this.currentStepsStrapline) {
                strapline = this.currentStepsStrapline
            }
            return strapline
        }
    },
    head() {
        return {
            title: this.step.step_metadata.html_title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.step.step_metadata.html_desc,
                },
            ],
        }
    },
}
