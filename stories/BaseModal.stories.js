export default {
  title: 'Design System/Modules/BaseModal',
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<BaseModal  v-bind="$props"><p>Aenean ac dapibus leo.</p><p>In hac habitasse platea dictumst. Nunc suscipit sagittis gravida. Maecenas ullamcorper ac eros eu vestibulum. Suspendisse potenti. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p><BaseButton><template v-slot:text>Modal button</template></BaseButton></BaseModal>`,
})

export const PrimaryModalWithClose = Template.bind({})
PrimaryModalWithClose.args = {
  show: true,
  showClose: true,
  title: 'Primary modal on primary background',
}
PrimaryModalWithClose.parameters = {
  backgrounds: {
    default: 'primary',
  },
}

export const SecondaryModalWithoutClose = Template.bind({})
SecondaryModalWithoutClose.args = {
  show: true,
  showClose: false,
  theme: 'secondary',
  title: 'Secondary modal, no close button',
}

export const LightModalWithClose = Template.bind({})
LightModalWithClose.args = {
  show: true,
  showClose: true,
  theme: 'light',
  title: 'Modal with light background',
}
