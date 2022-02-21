/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    aspectRatio: {
      none: 0,
      '16/9': [16, 9],
    },
    colors: {
      primary: {
        light: 'var(--primary-light)',
        mid: 'var(--primary-mid)',
        DEFAULT: 'var(--primary)',
        dark: 'var(--primary-dark)',
        focusRing: 'var(--primary-focusRing)',
      },
      secondary: {
        light: 'var(--secondary-light)',
        mid: 'var(--secondary-mid)',
        DEFAULT: 'var(--secondary)',
        dark: 'var(--secondary-dark)',
        focusRing: 'var(--secondary-focusRing)',
      },
      grey: {
        light: 'var(--grey-light)',
        'mid-light': 'var(--grey-mid-light)',
        mid: 'var(--grey-mid)',
        DEFAULT: 'var(--grey)',
        dark: 'var(--grey-dark)',
        whiteFocusRing: 'var(--grey-whiteFocusRing)',
      },
      white: '#fff',
      black: '#000',
      'notice-light': 'var(--notice-light)',
      warning: {
        light: 'var(--warning-light)',
        DEFAULT: 'var(--warning)',
      },
      success: {
        light: 'var(--success-light)',
        DEFAULT: 'var(--success)',
      },
      transparent: 'transparent',
      color: {
        h1: 'var(--text-color-h1)',
        h2: 'var(--text-color-h2)',
        h3: 'var(--text-color-h3)',
        h4: 'var(--text-color-h4)',
        h5: 'var(--text-color-h5)',
        lead: 'var(--text-color-lead)',
        bullets: 'var(--text-color-bullets)',
        body: 'var(--text-color-body)',
      },
      'content-section': {
        light: 'var(--content-section-bg-light)',
        mid: 'var(--content-section-bg-mid)',
      },
      'pre-nav': 'var(--pre-nav-bg)',
    },
    fontWeight: {
      medium: 'var(--font-weight-medium)',
      'semi-bold': 'var(--font-weight-semi-bold)',
      bold: 'var(--font-weight-bold)',
      'weight-h1': 'var(--font-weight-h1)',
      'weight-h2': 'var(--font-weight-h2)',
      'weight-h3': 'var(--font-weight-h3)',
      'weight-h4': 'var(--font-weight-h4)',
      'weight-h5': 'var(--font-weight-h5)',
      'weight-lead': 'var(--font-weight-lead)',
      'weight-body': 'var(--font-weight-body)'
    },
    fontSize: {
      small: 'var(--font-size-small)', // '16px'
      base: 'var(--font-size-base)', // '19px'
      h5: 'var(--font-size-h5)', // '20px'
      h4: 'var(--font-size-h4)', // '26px',
      h3: 'var(--font-size-h3)', // '32px',
      h2: 'var(--font-size-h2)', // '40px',
      h1: 'var(--font-size-h1)', // '48px',
      'xs-small': 'var(--font-size-xs-small)', // '14px'
      'xs-h1': 'var(--font-size-xs-h1)', // 32px
      'xs-h2': 'var(--font-size-xs-h2)', // 28px;
      'xs-h3': 'var(--font-size-xs-h3)', // 24px
      'xs-h4': 'var(--font-size-xs-h4)', // 20px
      'xs-h5': 'var(--font-size-xs-h5)', // 18px
      'xs-base': 'var(--font-size-xs-base)', // 16px
    },
    lineHeight: {
      small: 'var(--line-height-small)', // '16px'
      base: 'var(--line-height-base)', // '19px'
      h5: 'var(--line-height-h5)', // '20px'
      h4: 'var(--line-height-h4)', // '26px',
      h3: 'var(--line-height-h3)', // '32px',
      h2: 'var(--line-height-h2)', // '40px',
      h1: 'var(--line-height-h1)', // '48px',
      'xs-small': 'var(--line-height-xs-small)', // '14px'
      'xs-h1': 'var(--line-height-xs-h1)', // 32px
      'xs-h2': 'var(--line-height-xs-h2)', // 28px;
      'xs-h3': 'var(--line-height-xs-h3)', // 24px
      'xs-h4': 'var(--line-height-xs-h4)', // 20px
      'xs-h5': 'var(--line-height-xs-h5)', // 18px
      'xs-base': 'var(--line-height-xs-base)', // 16px
    },
    fontFamily: {
      sans: ['var(--font-family)', ...defaultTheme.fontFamily.sans],
    },
    fill: (theme) => theme('colors'),
    extend: {
      borderRadius: {
        'btn': 'var(--btn-border-radius)'
      },
      borderWidth: {
        'btn': 'var(--btn-border-width)',
        3: '3px',
      },
      boxShadow: (theme) => ({
        'outline-on-light': '0 0 0 3px ' + theme('colors.primary.focusRing'),
        'outline-on-dark': '0 0 0 3px ' + theme('colors.grey.whiteFocusRing'),
        'inner-outline-on-light':
          'inset 0 0 0 3px ' + theme('colors.primary.focusRing'),
        'inner-outline-on-dark':
          'inset 0 0 0 3px ' + theme('colors.grey.whiteFocusRing'),
        'outer-top-on-light':
          '0 -3px 3px -3px ' + theme('colors.primary.focusRing'),
      }),
      translate: {
        105: '105%',
      },
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        115: '115px',
        120: '120px',
        125: '125px',
        '7em': '7em',
      },
      minHeight: {
        12: '3rem',
        16: '4rem',
      },
      maxHeight: {
        '90vh': '90vh',
      },
      inset: {
        100: '100%',
      },
      transitionDuration: {
        400: '400ms',
      },
      screens: {
        xs: '360px',
        xxs: { max: '320px' },
        'landscape-shallow': {
          raw: '(orientation: landscape) and (max-height: 600px)',
        },
        'print': {'raw': 'print'},
      },
      zIndex: {
        9999: '9999',
      },
    },
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    fill: ['responsive', 'hover', 'group-hover', 'focus'],
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    borderColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    cursor: ['hover', 'disabled'],
    aspectRatio: ['responsive'],
    textColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    margin: ['responsive', 'first'],
    width: ['responsive', 'hover', 'group-hover'],
    height: ['responsive', 'hover', 'group-hover'],
  },
  plugins: [
    require('tailwindcss-responsive-embed'),
    require('tailwindcss-aspect-ratio'),
  ],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
    options: {
      safelist: {
        standard: [
          'shadow-inner-outline-on-light',
          'shadow-inner-outline-on-dark',
          'md:hidden',
          'md:flex',
          // '*:focus',
          // '*:focus-visible',
        ],
        deep: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^nuxt-link(|-exact)-active$/,
          /^(text|leading|text-xs|leading-xs)-h/,
          /^(xs|sm|md|lg|xl)(|:(hidden|flex))$/,
        ],
      },
    },
  },
}
