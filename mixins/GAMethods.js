import { mapState } from 'vuex'
export const GAMethods = {
  computed: {
    ...mapState({
      siteName: (state) => state.site.siteDetails.siteName,
      siteOrganisation: (state) => state.site.siteDetails.organisationName,
      audience: (state) => state.site.siteDetails.audience,
      isMultiVersion: (state) => state.site.isMultiVersion,
      version: (state) => state.steps.currentStepsVersion,
    }),
    // Not used now
    siteEventProperties() {
      const siteEventProperties = {
      }
      return siteEventProperties
    },
    versionEventProperties() {
      const versionEventProperties = {}
      if(JSON.parse(this.isMultiVersion)){
        versionEventProperties.version = this.version
      }
      return versionEventProperties
    },
  },
  methods: {
    // eventProperty needs to be a object
    gaLogEvent(eventText, eventProperty) {

      // Add event props to site props (https://codingnconcepts.com/javascript/combine-json-objects-in-javascript/)
      const allEventProperties = {
        ...this.versionEventProperties,
        ...eventProperty,
      }

      if (
        this.$config.GA_Enabled &&
        this.$morphCookies &&
        this.$morphCookies.getGDPR() &&
        this.$nuxt.isOnline &&
        this.$config.GA_Key !== null
        ) {

        if (typeof allEventProperties !== 'undefined' && Object.keys(allEventProperties).length > 0) {
          // the array is defined and has at least one element
          this.$gtag.event(eventText, allEventProperties);   
        } else {
          this.$gtag.event(eventText);
        }
          
        if (process.env.NODE_ENV !== 'production') {
          console.log('GA event logged:', eventText, allEventProperties)
        }

      } else if (process.env.NODE_ENV !== 'production') {
        console.log('GA event not logged:', eventText, allEventProperties)
      }
    },      
    gaResetUser() {
      if (process.env.NODE_ENV !== 'production') {
        console.log("deleting '_ga' cookie to reset unique user");
      }
      document.cookie = '_ga=; Max-Age=0; path=/; domain=' + location.hostname;
      // We have to reload the page after deleting _ga cookie in order to load the next _ga to track the next user
      location.reload();
    },
  },
}
  