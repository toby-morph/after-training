export default {
  title: 'Design System/Atoms/BaseImage',
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<BaseImg  v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {
  src: 'PI-1.svg',
  alt: 'Some useful alt text',
}
