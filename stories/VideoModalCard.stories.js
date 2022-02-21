export default {
  title: 'Shared/Video/Video Modal Card',
  decorators: [
    () => ({
      template:
        '<main class="main"><div style="max-width: 300px"><story/></div></main>',
    }),
  ],
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<VideoModalCard v-bind="$props"><template v-slot:title>A video card</template><template v-slot:summary>This card is your standard video card, white on a light background.</template></VideoModalCard>`,
})

export const PrimaryVideoModalCard = Template.bind({})
PrimaryVideoModalCard.args = {
  imgSrc: '16-9-video-thumb-1-1000w-576x324.png',
  imgAlt: 'Some useful alt text',
  theme: 'primary',
  align: 'center',
  headerLevel: '2',
  headerFontSize: '3',
  wholeClickable: true,
  videoId: '500791265',
  videoTitle: 'Participant Information Animation',
  videoTranscript:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam laoreet tincidunt mi ac tincidunt. In in orci ante. Curabitur eget accumsan tellus. Fusce ut felis finibus, tempus lorem vitae, gravida augue. Pellentesque aliquam ipsum odio, vel consectetur felis porttitor rhoncus. Curabitur placerat, sem pulvinar lobortis bibendum, dui risus elementum nulla, pharetra commodo odio urna vitae purus. Maecenas iaculis gravida placerat. Cras ac posuere tortor. Aenean ultricies enim enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam tortor dolor, egestas vitae efficitur in, malesuada sed felis. Etiam libero massa, sodales eu pulvinar vitae, bibendum bibendum lectus. Aenean nec faucibus purus, non gravida ligula. Nullam fringilla arcu id sapien luctus bibendum. Nullam erat dolor, sodales ut fringilla ultricies, placerat at lacus.\n\nPhasellus massa nunc, laoreet in dolor a, molestie malesuada erat. Phasellus a diam sit amet urna cursus mollis. Ut a est porttitor, bibendum quam sit amet, placerat mauris. Morbi non velit venenatis orci viverra ultricies. Phasellus in urna non risus consectetur pulvinar. Morbi a nisi a mi varius ullamcorper. Aliquam volutpat elit erat, at ultricies purus iaculis a. Etiam in diam mollis, faucibus neque sit amet, pretium diam.\n\nDuis accumsan sem ipsum, in ultricies elit elementum ac. Phasellus quis felis a dui dictum ullamcorper id sit amet tortor. Praesent viverra et justo vitae dignissim. Nam bibendum, eros sed ultricies vulputate, leo purus egestas purus, ac porttitor sem libero nec purus. Curabitur facilisis vulputate eros, ac auctor dolor posuere vel. Phasellus rhoncus arcu id arcu accumsan, ut maximus metus tempor. Nulla semper nibh elit, vestibulum fermentum erat pulvinar id.',
}

export const SecondaryVideoModalCard = Template.bind({})
SecondaryVideoModalCard.args = {
  imgSrc: '16-9-video-thumb-2-1000w-576x324.png',
  imgAlt: '',
  theme: 'secondary',
  align: 'center',
  headerLevel: '2',
  headerFontSize: '3',
  wholeClickable: true,
  videoId: '500791265',
  videoTitle: 'Participant Information Animation',
  videoTranscript:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam laoreet tincidunt mi ac tincidunt. In in orci ante. Curabitur eget accumsan tellus. Fusce ut felis finibus, tempus lorem vitae, gravida augue. Pellentesque aliquam ipsum odio, vel consectetur felis porttitor rhoncus. Curabitur placerat, sem pulvinar lobortis bibendum, dui risus elementum nulla, pharetra commodo odio urna vitae purus. Maecenas iaculis gravida placerat. Cras ac posuere tortor. Aenean ultricies enim enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam tortor dolor, egestas vitae efficitur in, malesuada sed felis. Etiam libero massa, sodales eu pulvinar vitae, bibendum bibendum lectus. Aenean nec faucibus purus, non gravida ligula. Nullam fringilla arcu id sapien luctus bibendum. Nullam erat dolor, sodales ut fringilla ultricies, placerat at lacus.\n\nPhasellus massa nunc, laoreet in dolor a, molestie malesuada erat. Phasellus a diam sit amet urna cursus mollis. Ut a est porttitor, bibendum quam sit amet, placerat mauris. Morbi non velit venenatis orci viverra ultricies. Phasellus in urna non risus consectetur pulvinar. Morbi a nisi a mi varius ullamcorper. Aliquam volutpat elit erat, at ultricies purus iaculis a. Etiam in diam mollis, faucibus neque sit amet, pretium diam.\n\nDuis accumsan sem ipsum, in ultricies elit elementum ac. Phasellus quis felis a dui dictum ullamcorper id sit amet tortor. Praesent viverra et justo vitae dignissim. Nam bibendum, eros sed ultricies vulputate, leo purus egestas purus, ac porttitor sem libero nec purus. Curabitur facilisis vulputate eros, ac auctor dolor posuere vel. Phasellus rhoncus arcu id arcu accumsan, ut maximus metus tempor. Nulla semper nibh elit, vestibulum fermentum erat pulvinar id.',
}

export const LightVideoModalCard = Template.bind({})
LightVideoModalCard.args = {
  imgSrc: '16-9-video-thumb-3-1000w-576x324.png',
  imgAlt: '',
  theme: 'white',
  align: 'center',
  headerLevel: '2',
  headerFontSize: '3',
  wholeClickable: true,
  videoId: '500791265',
  videoTitle: 'Participant Information Animation',
  videoTranscript:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam laoreet tincidunt mi ac tincidunt. In in orci ante. Curabitur eget accumsan tellus. Fusce ut felis finibus, tempus lorem vitae, gravida augue. Pellentesque aliquam ipsum odio, vel consectetur felis porttitor rhoncus. Curabitur placerat, sem pulvinar lobortis bibendum, dui risus elementum nulla, pharetra commodo odio urna vitae purus. Maecenas iaculis gravida placerat. Cras ac posuere tortor. Aenean ultricies enim enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam tortor dolor, egestas vitae efficitur in, malesuada sed felis. Etiam libero massa, sodales eu pulvinar vitae, bibendum bibendum lectus. Aenean nec faucibus purus, non gravida ligula. Nullam fringilla arcu id sapien luctus bibendum. Nullam erat dolor, sodales ut fringilla ultricies, placerat at lacus.\n\nPhasellus massa nunc, laoreet in dolor a, molestie malesuada erat. Phasellus a diam sit amet urna cursus mollis. Ut a est porttitor, bibendum quam sit amet, placerat mauris. Morbi non velit venenatis orci viverra ultricies. Phasellus in urna non risus consectetur pulvinar. Morbi a nisi a mi varius ullamcorper. Aliquam volutpat elit erat, at ultricies purus iaculis a. Etiam in diam mollis, faucibus neque sit amet, pretium diam.\n\nDuis accumsan sem ipsum, in ultricies elit elementum ac. Phasellus quis felis a dui dictum ullamcorper id sit amet tortor. Praesent viverra et justo vitae dignissim. Nam bibendum, eros sed ultricies vulputate, leo purus egestas purus, ac porttitor sem libero nec purus. Curabitur facilisis vulputate eros, ac auctor dolor posuere vel. Phasellus rhoncus arcu id arcu accumsan, ut maximus metus tempor. Nulla semper nibh elit, vestibulum fermentum erat pulvinar id.',
}
