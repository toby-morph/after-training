export default {
  title: 'PIT/PageTitle',
  decorators: [() => ({ template: '<main><story/></main>' })],
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<PitPageTitle v-bind="$props" />`,
})

export const PageTitle = Template.bind({})
PageTitle.args = {
  pageTitle: 'Lorem ipsum dolor sit amet',
  pageSubTitle:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse venenatis convallis velit at suscipit. Etiam eleifend ullamcorper fringilla.',
}
PageTitle.parameters = {
  backgrounds: {
    default: 'white',
  },
}
