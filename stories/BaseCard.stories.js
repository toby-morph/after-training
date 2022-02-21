export default {
  title: 'Design System/Modules/BaseCard',
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<BaseCard v-bind="$props"><BaseImg v-if="imgSrc" :src="imgSrc" :alt="imgAlt" />    <BaseCardTitle
  :header-level="headerLevel"
  :header-font-size="headerFontSize"
  >Base Card</BaseCardTitle
></BaseCard>`,
})

export const Default = Template.bind({})
Default.args = {
  imgSrc: 'PI-1.svg',
  imgAlt: 'Some useful alt text',
  theme: 'white',
  align: 'center',
  headerLevel: 2,
  headerFontSize: 3,
  wholeClickable: true,
}

export const PrimaryCard = Template.bind({})
PrimaryCard.args = {
  imgSrc: 'PI-1.svg',
  imgAlt: 'Some useful alt text',
  theme: 'primary',
  align: 'center',
  headerLevel: 2,
  headerFontSize: 3,
  wholeClickable: false,
}
