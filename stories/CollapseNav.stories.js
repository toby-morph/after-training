export default {
  title: 'Shared/Collapse Nav',
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<CollapseNav />`,
})

export const Default = Template.bind({})
