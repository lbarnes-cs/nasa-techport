# Laurence Barnes' NASA TechPort coding challenge

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Why I choose to use Nuxt

when looking at the coding challenge brief, I wanted to demonstrate the ability of using Nuxt to create landing pages, with the plan on using NASA's organizations endpoint to generate landing pages. Due to time restraint, I didn't end up achieving this goal.

The other reason I choose to use Nuxt was to use the build-in server, Nitro, to help create a proxy for the NASA API endpoint.

## CORS Issues

When planning my application, I knew that calling the NASA API endpoint, there will be a restriction on calling the endpoint on client-side, and we would need to fetch the API on the server side. Nuxt has finally reached the point where the client is able to talk to the Nitro server and have dynamic endpoints, allowing the client to talk to the server smoothly.

Resource:

- [The BEST way to proxy your API in Nuxt](https://www.youtube.com/watch?v=J4E5uYz5AY8)

Failed attempts:

- [Nitro RouteRules](https://nitro.unjs.io/config#routerules)
- [Nuxt Proxy](https://github.com/wobsoriano/nuxt-proxy)
- [API Party](https://nuxt.com/modules/api-party)

## Further enhancement

### Limitation of project API Call

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

### Improve pagination

Currently the pagination displays all the pages, which means if we have more pages than width of the page, the pagination will break. We should use a cut off to show maybe the next / previous X pages. A temporary solution for now is to hide the pages if the page count is above a certain threshold.

### Improved security

At the moment, we print all the fields that we get from the JSON object, blindly trusting what the content is. This has the potential for a XSS attack. We should introduce a plugin such as [vue-dompurify-html](https://github.com/LeSuisse/vue-dompurify-html/) with a white-list of HTML elements.

### UI Clean up and further enhancements

To bring a cleaner user experience, some further enhancements should be made. This includes:

**Remember `results per page` in localStorage, and selected pagination in history / URL**
For a cleaner user-experience, it would be good to remember both the `results per page` and `selected pagination`, ensuring that when the user returns back to the search page, their previous state may be remembered

For `results per page`, when the user reloads the page, it would be a cleaner user-experience if the previously selected result is remembered, and the user doesn't need to change the drop down every time.

As for hte `selected pagination`, if we include this as a URL parameter when the pagination is changed. User flow: the user selects a project on the second page, and upon reading the project and pressing the back button, they will return back to the second page. This could be achieved by using the URL parameter and the browser's history.

**Improve loading state**
Add a cleaner loading state, replacing the fixed "loading cards" when searching for projects, and replace with a skeleton. This will give a smoother, animated loading state

**Display `<IconCSS>` on server side**
At the moment, the component `<IconCSS>` is only loaded on the `client` due to hydration mismatch issues. To help keep the UI from jumping, it would a smoother user experience to keep the icons visible at all times.

## Setup

Make sure to install the dependencies:

```bash
# Install packages
pnpm install

# Generate types
pnpm postinstall
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm build && pnpm generate
```

Locally preview production build:

```bash
# pnpm
pnpm preview
```
