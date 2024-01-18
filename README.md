# Laurence Barnes' NASA TechPort coding challenge

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Further enhancement

**Limitation of project API Call**
The current API call to search projects (`/api/projects`) based upon `updatedSince` doesn't display all the relevant data outlined in the coding challenge brief. Idealistic, we want to include "name, start and end of the project". With the current API call, the `title` is currently blank, and we are not returned the `startDate` and `endDate` within the search response. This information is present when requesting the `project` based upon the `projectId`.

```json
{
  "projects": [
    {
      "acronym": "",
      "projectId": 145031,
      "title": "",
      "website": "",
      "lastUpdated": "2024-1-16"
    },
    {
      "acronym": "",
      "projectId": 105782,
      "title": "",
      "website": "",
      "lastUpdated": "2024-1-16"
    }
  ]
]
```

One solution would be to ping every individual project, and inject the relevant data into the `projects[]` array. But this could result in an large number of API calls, and could well exceed our API request hourly limit [Web Service Rate Limits](https://api.nasa.gov/)

```js
useFetch(`https://techport.nasa.gov/api/projects?updatedSince=${selectedDate}`).then(response => {


     useFetch(`https://techport.nasa.gov/api/projects/${projectId}`).then(project=> {
        // map the responces
        paragraphs.value = it2
     }
  }

```

**Improve pagination**
Currently the pagination displays all the pages, which means if we have more pages than width of the page, the pagination will break. We should use a cut off to show maybe the next / previous X pages. A temporary solution for now is to hide the pages if the page count is above a certain threshold.

**Improved security**
At the moment, we print all the fields that we get from the JSON object, blindly trusting what the content is. This has the potential for a XSS attack. We should introduce a plugin such as [vue-dompurify-html](https://github.com/LeSuisse/vue-dompurify-html/) with a white-list of HTML elements.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
