export default {
  title: 'PIT/PageFooter',
  // decorators: [() => ({ template: '<main><story/></main>' })],
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<PitFooter v-bind="$props" />`,
})

export const PitFooter = Template.bind({})
PitFooter.args = {}
