export default {
  title: 'Design System/Atoms/BaseVideo',
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<BaseVideo  v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {
  videoId: '500791265',
}
