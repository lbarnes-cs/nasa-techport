// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@vee-validate/nuxt', '@nuxtjs/google-fonts', 'nuxt-icon'],

  css: ['~/assets/styles/main.scss'],

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
      Roboto: [400, 500, 700],
      Inter: [400, 700],
    },
  },

  routeRules: {
    '/api/**': {
      proxy: { to: 'https://techport.nasa.gov/api/**' },
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['clearApiToken'].includes(tag),
    },
  },
});
