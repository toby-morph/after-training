export default {
  title: 'Design System/Atoms/BaseButton',
  description:
    'Button is available in different themes depending on whether the background is dark or light.',
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<BaseButton class="${args.btnClass}"><template v-slot:text>${args.btnText}</template></BaseButton>`,
})

export const ButtonLight = Template.bind({})
ButtonLight.args = {
  btnClass: 'btn-light',
  btnText: 'Button Light',
}
ButtonLight.parameters = {
  backgrounds: {
    default: 'primary',
  },
}

export const ButtonDark = Template.bind({})
ButtonDark.args = {
  btnClass: 'btn-dark',
  btnText: 'Button Dark',
}
