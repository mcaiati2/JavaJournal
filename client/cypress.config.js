const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3333",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});


// import { defineConfig } from 'cypress';

// const is_prod = process.env.PORT;

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//     baseUrl: is_prod ? 'http://localhost:10000' : 'http://localhost:5173',
//   },

//   component: {
//     devServer: {
//       framework: 'react',
//       bundler: 'vite',
//     },
//   },
// });