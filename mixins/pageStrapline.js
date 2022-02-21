import { mapState } from 'vuex'

export const pageStrapline = {
  computed: {
    ...mapState({
      siteStrapline: (state) => state.site.siteDetails.siteStrapline,
    }),
    pageStrapline(){
      let pageStrapline = null
      if(this.page && this.page.page_strapline){
        pageStrapline = this.page.page_strapline
      } else {
        pageStrapline = this.siteStrapline
      }
      return pageStrapline
    },
  }
}
