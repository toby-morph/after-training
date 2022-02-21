export default {
  title: 'PIT/Page Header',
  // decorators: [() => ({ template: '<main><story/></main>' })],
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<PitHeader v-bind="$props" />`,
})

export const PitHeader = Template.bind({})
PitHeader.args = {}
