import Vue from "vue";
import VueGtag from "vue-gtag";

export default function ({ $config }) {

    if ($config.GA_Enabled) {

        Vue.use(VueGtag, {
            config: { 
              id: $config.GA_Key,
              params: {
              'cookie_domain': location.hostname,
              enabled: localStorage.getItem('GDPR:accepted'), 
              pageTrackerScreenviewEnabled: true,
              }  
            },
          });          
           
    } else {
      document.cookie = '_ga=; Max-Age=0; path=/; domain=' + location.hostname;
    }
  }