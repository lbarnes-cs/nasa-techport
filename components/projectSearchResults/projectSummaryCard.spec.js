import { mount, RouterLinkStub } from '@vue/test-utils';
import { it, expect, beforeAll } from 'vitest';

import ProjectSummaryCard from './projectSummaryCard.vue';

const stubs = {
  NuxtLink: RouterLinkStub,
  IconCSS: '<div><slot /><div>',
  ClientOnly: '<div><slot /><div>',
};

describe('Project Summary Card > With data', () => {
  let wrapper = null;

  beforeAll(() => {
    wrapper = mount(ProjectSummaryCard, {
      props: {
        projectId: 123,
        title: 'Title',
        lastUpdated: '23-01-01',
        endDateString: '2024-01-01',
        startDateString: '2024-01-01',
        statusDescription: 'Completed',
      },
      stubs,
    });
  });

  it('Should have a title', () => {
    expect(wrapper.get('[data-test="projectCard-title"]').text()).toContain(
      'Title',
    );
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Project Summary Card > Without data', () => {
  let wrapper = null;

  beforeAll(() => {
    wrapper = mount(ProjectSummaryCard, {
      props: {
        projectId: 123,
        title: '',
        lastUpdated: '23-01-01',
        endDateString: '2024-01-01',
        startDateString: '2024-01-01',
        statusDescription: 'Completed',
      },
      stubs,
    });
  });

  it('Should not display a title', () => {
    expect(wrapper.find('[data-test="projectCard-loading"]')).toBeDefined();
  });

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
