import colors from 'vuetify/es5/util/colors'


const lightTheme = {
  primary:"#283593",
  succes:"#4CAF50",
  warning:"#ffb22a",
  default:"#563dea",
  background:"#ECEFF1",
}
const darkTheme = {
  primary:"#283593",
  succes:"#4CAF50",
  warning:"#ffb22a",
  default:"#563dea",
}

export default {
  // server: {
  //   host: 'localhost', // This will listen on all available network interfaces
  //   port: 3000 // You can specify the port you want to use
  // },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - CAPSTONE',
    title: 'IOC',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/v.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/chart-plugin.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],
  
  axios:{
    baseUrl: 'http://localhost:1337/'
  },
  
  loading: false,

 // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
 vuetify: {
  customVariables: ['~/assets/variables.scss'],
  treeShake:true,
  theme: {
    options:{
      customProperties: true,
    },
    dark: false,
    themes: {
      dark: darkTheme,
      light: lightTheme,
    }
  }
},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },


}
