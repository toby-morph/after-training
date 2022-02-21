export default {
  title: 'Shared/Content Sections/Content Section Text',
  decorators: [() => ({ template: '<main><story/></main>' })],
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<ContentSectionText v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {
  section: {
    text: '**Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.**\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    links: [
      {
        target: true,
        title: 'Return to Study website',
        url: 'http://www.morph.co.uk',
        logEvent: 'Further Action',
        logEventProperty: 'Return to Study website',
      },
      {
        target: false,
        title: 'Screening and Consent',
        url: 'http://www.morph.co.uk',
        logEvent: 'Screening and Consent',
      },
    ],
  },
}
