export default {
  title: 'Shared/Content Sections/Content section video grid',
  decorators: [
    () => ({
      template:
        '<div id="appLayout"><div id="appContent"><main class="main"><story/></main></div></div>',
    }),
  ],
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<ContentSectionVideoCards v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {
  section: {
    text: '## Video modal card grid\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    video_cards: [
      {
        image: {
          url: '16-9-video-thumb-1-1000w-576x324.png',
          alt: 'Some useful alt text',
        },
        title: 'Integer fermentum',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        headerFontSize: '3',
        video: {
          vimeo_id: '500791265',
          video_title: 'Participant Information Animation',
          video_transcript:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam laoreet tincidunt mi ac tincidunt. In in orci ante. Curabitur eget accumsan tellus. Fusce ut felis finibus, tempus lorem vitae, gravida augue. Pellentesque aliquam ipsum odio, vel consectetur felis porttitor rhoncus. Curabitur placerat, sem pulvinar lobortis bibendum, dui risus elementum nulla, pharetra commodo odio urna vitae purus. Maecenas iaculis gravida placerat. Cras ac posuere tortor. Aenean ultricies enim enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam tortor dolor, egestas vitae efficitur in, malesuada sed felis. Etiam libero massa, sodales eu pulvinar vitae, bibendum bibendum lectus. Aenean nec faucibus purus, non gravida ligula. Nullam fringilla arcu id sapien luctus bibendum. Nullam erat dolor, sodales ut fringilla ultricies, placerat at lacus.\n\nPhasellus massa nunc, laoreet in dolor a, molestie malesuada erat. Phasellus a diam sit amet urna cursus mollis. Ut a est porttitor, bibendum quam sit amet, placerat mauris. Morbi non velit venenatis orci viverra ultricies. Phasellus in urna non risus consectetur pulvinar. Morbi a nisi a mi varius ullamcorper. Aliquam volutpat elit erat, at ultricies purus iaculis a. Etiam in diam mollis, faucibus neque sit amet, pretium diam.\n\nDuis accumsan sem ipsum, in ultricies elit elementum ac. Phasellus quis felis a dui dictum ullamcorper id sit amet tortor. Praesent viverra et justo vitae dignissim. Nam bibendum, eros sed ultricies vulputate, leo purus egestas purus, ac porttitor sem libero nec purus. Curabitur facilisis vulputate eros, ac auctor dolor posuere vel. Phasellus rhoncus arcu id arcu accumsan, ut maximus metus tempor. Nulla semper nibh elit, vestibulum fermentum erat pulvinar id.',
        },
      },
      {
        image: {
          url: '16-9-video-thumb-2-1000w-576x324.png',
          alt: 'Some useful alt text',
        },
        title: 'Quisque tempor leo lacus',
        summary:
          'Duis interdum aliquam neque, nec porttitor tortor euismod vitae. In malesuada cursus mollis.',
        headerFontSize: '3',
        video: {
          vimeo_id: '500791265',
          video_title: 'Participant Information Animation',
          video_transcript:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam laoreet tincidunt mi ac tincidunt. In in orci ante. Curabitur eget accumsan tellus. Fusce ut felis finibus, tempus lorem vitae, gravida augue. Pellentesque aliquam ipsum odio, vel consectetur felis porttitor rhoncus. Curabitur placerat, sem pulvinar lobortis bibendum, dui risus elementum nulla, pharetra commodo odio urna vitae purus. Maecenas iaculis gravida placerat. Cras ac posuere tortor. Aenean ultricies enim enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam tortor dolor, egestas vitae efficitur in, malesuada sed felis. Etiam libero massa, sodales eu pulvinar vitae, bibendum bibendum lectus. Aenean nec faucibus purus, non gravida ligula. Nullam fringilla arcu id sapien luctus bibendum. Nullam erat dolor, sodales ut fringilla ultricies, placerat at lacus.\n\nPhasellus massa nunc, laoreet in dolor a, molestie malesuada erat. Phasellus a diam sit amet urna cursus mollis. Ut a est porttitor, bibendum quam sit amet, placerat mauris. Morbi non velit venenatis orci viverra ultricies. Phasellus in urna non risus consectetur pulvinar. Morbi a nisi a mi varius ullamcorper. Aliquam volutpat elit erat, at ultricies purus iaculis a. Etiam in diam mollis, faucibus neque sit amet, pretium diam.\n\nDuis accumsan sem ipsum, in ultricies elit elementum ac. Phasellus quis felis a dui dictum ullamcorper id sit amet tortor. Praesent viverra et justo vitae dignissim. Nam bibendum, eros sed ultricies vulputate, leo purus egestas purus, ac porttitor sem libero nec purus. Curabitur facilisis vulputate eros, ac auctor dolor posuere vel. Phasellus rhoncus arcu id arcu accumsan, ut maximus metus tempor. Nulla semper nibh elit, vestibulum fermentum erat pulvinar id.',
        },
      },
      {
        image: {
          url: '16-9-video-thumb-3-1000w-576x324.png',
          alt: 'Some useful alt text',
        },
        title: 'Aliquam id mattis nisi',
        summary: 'Nullam a nunc tincidunt, commodo eros eu, porta urna.',
        headerFontSize: '3',
        video: {
          vimeo_id: '500791265',
          video_title: 'Participant Information Animation',
          video_transcript:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam laoreet tincidunt mi ac tincidunt. In in orci ante. Curabitur eget accumsan tellus. Fusce ut felis finibus, tempus lorem vitae, gravida augue. Pellentesque aliquam ipsum odio, vel consectetur felis porttitor rhoncus. Curabitur placerat, sem pulvinar lobortis bibendum, dui risus elementum nulla, pharetra commodo odio urna vitae purus. Maecenas iaculis gravida placerat. Cras ac posuere tortor. Aenean ultricies enim enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam tortor dolor, egestas vitae efficitur in, malesuada sed felis. Etiam libero massa, sodales eu pulvinar vitae, bibendum bibendum lectus. Aenean nec faucibus purus, non gravida ligula. Nullam fringilla arcu id sapien luctus bibendum. Nullam erat dolor, sodales ut fringilla ultricies, placerat at lacus.\n\nPhasellus massa nunc, laoreet in dolor a, molestie malesuada erat. Phasellus a diam sit amet urna cursus mollis. Ut a est porttitor, bibendum quam sit amet, placerat mauris. Morbi non velit venenatis orci viverra ultricies. Phasellus in urna non risus consectetur pulvinar. Morbi a nisi a mi varius ullamcorper. Aliquam volutpat elit erat, at ultricies purus iaculis a. Etiam in diam mollis, faucibus neque sit amet, pretium diam.\n\nDuis accumsan sem ipsum, in ultricies elit elementum ac. Phasellus quis felis a dui dictum ullamcorper id sit amet tortor. Praesent viverra et justo vitae dignissim. Nam bibendum, eros sed ultricies vulputate, leo purus egestas purus, ac porttitor sem libero nec purus. Curabitur facilisis vulputate eros, ac auctor dolor posuere vel. Phasellus rhoncus arcu id arcu accumsan, ut maximus metus tempor. Nulla semper nibh elit, vestibulum fermentum erat pulvinar id.',
        },
      },
      {
        image: {
          url: '16-9-video-thumb-4-1000w-576x324.png',
          alt: 'Some useful alt text',
        },
        title: 'Mauris et mi elit',
        summary:
          'Nullam libero est, molestie nec enim nec, consequat ultrices urna.',
        headerFontSize: '3',
        video: {
          vimeo_id: '500791265',
          video_title: 'Participant Information Animation',
          video_transcript:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam laoreet tincidunt mi ac tincidunt. In in orci ante. Curabitur eget accumsan tellus. Fusce ut felis finibus, tempus lorem vitae, gravida augue. Pellentesque aliquam ipsum odio, vel consectetur felis porttitor rhoncus. Curabitur placerat, sem pulvinar lobortis bibendum, dui risus elementum nulla, pharetra commodo odio urna vitae purus. Maecenas iaculis gravida placerat. Cras ac posuere tortor. Aenean ultricies enim enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam tortor dolor, egestas vitae efficitur in, malesuada sed felis. Etiam libero massa, sodales eu pulvinar vitae, bibendum bibendum lectus. Aenean nec faucibus purus, non gravida ligula. Nullam fringilla arcu id sapien luctus bibendum. Nullam erat dolor, sodales ut fringilla ultricies, placerat at lacus.\n\nPhasellus massa nunc, laoreet in dolor a, molestie malesuada erat. Phasellus a diam sit amet urna cursus mollis. Ut a est porttitor, bibendum quam sit amet, placerat mauris. Morbi non velit venenatis orci viverra ultricies. Phasellus in urna non risus consectetur pulvinar. Morbi a nisi a mi varius ullamcorper. Aliquam volutpat elit erat, at ultricies purus iaculis a. Etiam in diam mollis, faucibus neque sit amet, pretium diam.\n\nDuis accumsan sem ipsum, in ultricies elit elementum ac. Phasellus quis felis a dui dictum ullamcorper id sit amet tortor. Praesent viverra et justo vitae dignissim. Nam bibendum, eros sed ultricies vulputate, leo purus egestas purus, ac porttitor sem libero nec purus. Curabitur facilisis vulputate eros, ac auctor dolor posuere vel. Phasellus rhoncus arcu id arcu accumsan, ut maximus metus tempor. Nulla semper nibh elit, vestibulum fermentum erat pulvinar id.',
        },
      },
    ],
  },
}
