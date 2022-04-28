import Vue from "vue";
import VueGtag from "vue-gtag";

export default function ({ $config, $auth }) {

  if ($config.GA_Enabled) {

    const userId = $auth.user && $auth.user.id ? $auth.user.id : null

    Vue.use(VueGtag, {
      config: {
        id: $config.GA_Key,
        params: {
          'cookie_domain': location.hostname,
          'enabled': false,
          'pageTrackerScreenviewEnabled': true,
          'user_id': userId,
          'trainee_id': userId,
        }
      },
    });

  } else {
    document.cookie = '_ga=; Max-Age=0; path=/; domain=' + location.hostname;
  }
}