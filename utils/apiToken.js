import { getData, setData } from 'nuxt-storage/local-storage';

export const checkIfApiTokenExists = (config) =>
  !!config.public.apiToken || !!getData('apiToken');

export const getBearerToken = (config) =>
  config.public.apiToken || getData('apiToken');

export const setBearerToken = (token) => {
  // set to expire in (1) one (d) day
  setData('apiToken', token, 1, 'd');
};

export const clearBearerToken = () => {
  setData('apiToken', null);
};
