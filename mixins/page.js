export const page = {
  head() {
    return {
      title: this.page.page_metadata.html_title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.page_metadata.html_desc,
        },
      ],
    }
  },
}
