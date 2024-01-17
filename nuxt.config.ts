// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@vee-validate/nuxt', '@nuxtjs/google-fonts', 'nuxt-icon'],

  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },

  css: ['~/assets/styles/main.scss'],

  // Set meta-titles
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'NASA TechPort',
      titleTemplate: '%s | NASA TechPort',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'A database to locating detailed information about NASA-funded technologies',
        },
        {
          hid: 'description',
          name: 'og:image',
          content: 'https://techport.nasa/gov/images/NASA-Logo.png',
        },
        {
          hid: 'description',
          name: 'type',
          content: 'website',
        },
      ],
    },
  },

  // Pass env variables
  runtimeConfig: {
    public: {
      apiBase: '',
      apiKey: '',
      apiToken: '',
    },
  },

  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },

  googleFonts: {
    families: {
      Roboto: [300, 400, 500, 700],
      Inter: [400, 700],
    },
  },

  // Fix CORS issue on the client side
  routeRules: {
    '/api/**': {
      proxy: { to: 'https://techport.nasa.gov/api/**' },
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['[pid]'].includes(tag),
    },
  },
});
