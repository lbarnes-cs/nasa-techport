# Visable Coding Challenge

## Brief

**Build a frontend for the NASA TechPort API**

The NASA TechPort API (https://techport.nasa.gov/help/articles/api) exposes project data of NASA related projects. Your task is to build an appealing frontend for browsing through these projects.

## Requirements

1. Show a list of projects which were updated in the last 7 days. The user must be able to change the interval.

   - [ ] List items must at least contain the name, start and end of the project.
   - [ ] List must be paginate-able (10, 25, 50 items).

2. Selecting a list item should show details of the project. Project details should contain at least

   - [ ] The lead and supporting organizations.
   - [ ] All available contact persons, including their function in the project.
   - [ ] Up to you to decide which other information is important to show

3. It may return huge bulk of data. The frontend must not freeze and ensure that subsequent pagination requests are fast.

## Technical requirements

- [ ] Use Vue.js (+ Nuxt.js if needed)
- [ ] Provide meaningful tests for your code.
- [ ] You are allowed to use any 3rd-party library for styling & testing you want.
- [ ] We'd like to see code like you would do for production-ready systems, so think of edge cases, UI glitches, and some basic optimizations.

## Ideas

- [ ] Using env variables for the API Token, because "the token reflects an active session, you’ll need a new token each time you access the TechPort API."
  - [ ] Error handling: if the access token is not authorized, display an error message
- [ ] Landing pages:
  - [ ] organizationTypes: https://techport.nasa.gov/api/organizations/types
    - [ ] Divide up by `hasChildren`

## Resources:

- Choosing the Right Package Manager: NPM, Yarn, or PNPM?: https://hackernoon.com/choosing-the-right-package-manager-npm-yarn-or-pnpm
- Adding ESLint and Prettier to Nuxt 3: https://dev.to/tao/adding-eslint-and-prettier-to-nuxt-3-2023-5bg
