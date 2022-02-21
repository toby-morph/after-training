export default {
  title: 'Design System/Modules/BaseToolTip',
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<LibBaseToolTip v-bind="$props">${args.toolTipText}</LibBaseToolTip>`,
})

export const ToolTipArrowTopLeft = Template.bind({})
ToolTipArrowTopLeft.args = {
  theme: 'dark',
  arrowPos: 'topLeft',
  open: true,
  toolTipText:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse venenatis convallis velit at suscipit. Etiam eleifend ullamcorper fringilla.',
}

export const ToolTipArrowBottomRight = Template.bind({})
ToolTipArrowBottomRight.args = {
  theme: 'light',
  arrowPos: 'bottomRight',
  open: true,
  toolTipText: 'Etiam eleifend ullamcorper fringilla.',
}
ToolTipArrowBottomRight.parameters = {
  backgrounds: {
    default: 'primary',
  },
}
