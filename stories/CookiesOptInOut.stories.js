export default {
  title: 'Shared/Cookies/CookiesOptInOut',
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<CookiesOptInOut />`,
})

export const CookiesOptInOut = Template.bind({})
CookiesOptInOut.args = {}
CookiesOptInOut.parameters = {
  backgrounds: {
    default: 'primary',
  },
}
