<script>
export default {
  functional: true,
  props: {
    section: {
      type: Object,
      required: true,
    },
    sectionId: {
      type: String,
      default: null,
    },
    sectionType: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default: 'white',
    },
    sectionSpacing: {
      type: String,
      default: 'regular',
    },
  },
  render(createElement, context) {
    let sectionComponent = null

    const sectionComponentProps = {}
    const sectionObj = context.props.section
    if ('settings' in sectionObj) {
      if ('maxCardsPerRow' in sectionObj.settings) {
        sectionComponentProps.maxCardsPerRow =
          sectionObj.settings.maxCardsPerRow
      }
      if ('align' in sectionObj.settings) {
        sectionComponentProps.align = sectionObj.settings.align
      }
      if ('headerLevel' in sectionObj.settings) {
        sectionComponentProps.headerLevel = sectionObj.settings.headerLevel
      }
      if ('headerFontSize' in sectionObj.settings) {
        sectionComponentProps.headerFontSize =
          sectionObj.settings.headerFontSize
      }
      if ('wholeClickable' in sectionObj.settings) {
        sectionComponentProps.wholeClickable =
          sectionObj.settings.wholeClickable
      }
      if ('numberedCards' in sectionObj.settings) {
        sectionComponentProps.numberedCards = sectionObj.settings.numberedCards
      }
      if ('cardTheme' in sectionObj.settings) {
        sectionComponentProps.cardTheme = sectionObj.settings.cardTheme
      }
    }
    switch (context.props.sectionType) {
      case 'text_and_image':
        sectionComponent = 'LibContentSectionTextImg'
        break
      case 'text_and_video':
        sectionComponent = 'LibContentSectionTextVideo'
        break
      case 'video_cards':
        sectionComponent = 'LibContentSectionCards'
        break
      case 'text_and_cards':
        sectionComponent = 'LibContentSectionCards'
        break
      default:
        sectionComponent = 'LibContentSectionText'
    }
    return createElement(
      sectionComponent,
      {
        props: {
          sectionId: context.props.sectionId,
          section: context.props.section,
          sectionSpacing: context.props.sectionSpacing,
          sectionType: context.props.sectionType,
          theme: context.props.theme,
          ...sectionComponentProps,
        },
      },
      context.children
    )
    // console.log(context.data)
    // return createElement(sectionComponent, context.data, context.children)
  },
}
</script>
