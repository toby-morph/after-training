export default {
  title: 'Shared/Cookies/CookieSettingsModal',
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<LibCookieSettingsModal />`,
})

export const CookieSettingsModal = Template.bind({})
CookieSettingsModal.args = {
  cookieSettingsModalShow: true,
}
CookieSettingsModal.parameters = {
  backgrounds: {
    default: 'primary',
  },
}
