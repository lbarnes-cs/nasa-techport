import { mount } from '@vue/test-utils';
import { it, expect, beforeAll } from 'vitest';

import contactInfoFixture from '../../tests/fixations/contactInformation.json';
import ContactInformation from './contactInformation.vue';

describe('Contact Information > multiple contacts', () => {
  let wrapper = null;

  beforeAll(() => {
    wrapper = mount(ContactInformation, {
      props: {
        title: 'Title',
        contacts: contactInfoFixture.projectManagers,
      },
    });
  });

  it('Should have a title', () => {
    expect(wrapper.get('[data-test="contactInfo-title"]').text()).toContain(
      'Title',
    );
  });

  it('Should have two contacts', () => {
    expect(wrapper.findAll('[data-test="contactInfo-contact"]').length).toBe(
      contactInfoFixture.projectManagers.length,
    );
  });

  it('Should have one contact', async () => {
    await wrapper.setProps({ contacts: contactInfoFixture.programManagers });

    expect(wrapper.findAll('[data-test="contactInfo-contact"]').length).toBe(
      contactInfoFixture.programManagers.length,
    );
  });

  it('Should have contact fullName and email', async () => {
    // Adding the prop for program manager just in case we change the order of tests
    await wrapper.setProps({ contacts: contactInfoFixture.programManagers });

    expect(wrapper.get('[data-test="contactInfo-contact"]').text()).toBe(
      contactInfoFixture.programManagers[0].fullName,
    );

    expect(
      wrapper.get('[data-test="contactInfo-contact"]').attributes('href'),
    ).toBe(`mailto://${contactInfoFixture.programManagers[0].primaryEmail}`);
  });
});
