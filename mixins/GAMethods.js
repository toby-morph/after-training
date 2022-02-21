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
      if (
        this.$config.GA_Enabled &&
        this.$morphCookies &&
        this.$morphCookies.getGDPR() &&
        this.$nuxt.isOnline &&
        this.$config.GA_Key !== null
        ) 
        {

          // Add event props to site props (https://codingnconcepts.com/javascript/combine-json-objects-in-javascript/)
          const allEventProperties = {
            ...this.siteEventProperties,
            ...this.versionEventProperties,
            ...eventProperty,
            // ...eventOnlineProperty,
          }
          this.$gtag.event(eventText, allEventProperties);
          
          // console.log("process env : " + process.env.NODE_ENV);
          if (process.env.NODE_ENV !== 'production') {
            console.log('GA event logged:', eventText, allEventProperties)
          }
        } else if (process.env.NODE_ENV !== 'production') {
          console.log('no GA event logged:', eventText)
        }
      },
      
      gaResetUser() {
        console.log("deleting '_ga' cookie to reset unique user");
        document.cookie = '_ga=; Max-Age=0; path=/; domain=' + location.hostname;
        // We have to reload the page after deleting _ga cookie in order to load the next _ga to track the next user
        location.reload();
      },
    },
  }
  