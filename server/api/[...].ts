import { joinURL } from 'ufo';

/**
 * Code from https://github.com/manniL/alexander-lichter-proxy-nuxt/tree/main
 */
export default defineEventHandler(async (event) => {
  // Get the runtimeconfig proxy url
  const proxyUrl = useRuntimeConfig().public.apiBase;

  // check the path
  // NOTE: as we are doubling up on '/api' in both the baseAPI
  // and the path, we are going to remove the second 'api' from the path
  // we want to keep it in to make our code more readable
  const path = event.path.replace(/^\/api\//, ''); // /api/users -> users
  const target = joinURL(proxyUrl, path);

  // proxy it!
  return proxyRequest(event, target);
});
