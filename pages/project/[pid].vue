<template>
  <div>
    <div v-if="error">
      <p>{{ error }}</p>

      <clearApiToken />
    </div>

    <div v-else-if="pending">pending</div>

    <div v-else>
      <ul>
        <li>The lead and supporting organizations.</li>
        <li>
          All available contact persons, including their function in the
          project.
        </li>
        <li>
          Up to you to decide which other information is important to show.
        </li>
      </ul>

      <main class="projectInfo">
        <article class="projectInfo__main">
          <p>Title: {{ post.project.title }}</p>
          <p>Status: {{ post.project.statusDescription }}</p>

          <p>Lead: {{ post.project.leadOrganization }}</p>
        </article>

        <div class="projectInfo__sidebar">
          <aside>
            <h2>Project Summary</h2>
            <dl class="twoColumns">
              <dt>Views:</dt>
              <dd>
                {{ post.project.viewCount }}
              </dd>

              <dt>Start date:</dt>
              <dd f>{{ post.project.startDateString }}</dd>

              <dt v-if="post.project.statusDescription === 'Completed'">
                Completion date:
              </dt>
              <dd v-if="post.project.statusDescription === 'Completed'">
                {{ post.project.endDateString }}
              </dd>

              <dt>Last updated:</dt>
              <dd>{{ post.project.lastUpdated }}</dd>
            </dl>
          </aside>

          <aside>
            <h2>Project Management</h2>
            <dl>
              <dt>Program Manager:</dt>
              <dd>
                <a
                  v-for="(contact, index) in getContactInfo(
                    post?.project?.programManagers,
                  )"
                  :key="index"
                  :href="`mailto://${contact.email}`"
                  class="projectInfo__link"
                  >{{ contact.name }}</a
                >
              </dd>

              <dt>Project Managers:</dt>
              <dd>
                <a
                  v-for="(contact, index) in getContactInfo(
                    post?.project?.projectManagers,
                  )"
                  :key="index"
                  :href="`mailto://${contact.email}`"
                  class="projectInfo__link"
                  >{{ contact.name }}</a
                >
              </dd>

              <dt>Principal Investigator:</dt>
              <dd>
                <a
                  v-for="(contact, index) in getContactInfo(
                    post?.project?.principalInvestigators,
                  )"
                  :key="index"
                  :href="`mailto://${contact.email}`"
                  class="projectInfo__link"
                  >{{ contact.name }}</a
                >
              </dd>

              <dt>Co-Investigators:</dt>
              <dd>
                <a
                  v-for="(contact, index) in getContactInfo(
                    post?.project?.coInvestigators,
                  )"
                  :key="index"
                  :href="`mailto://${contact.email}`"
                  class="projectInfo__link"
                  >{{ contact.name }}</a
                >
              </dd>
            </dl>
          </aside>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { getBearerToken } from '@/utils/apiToken';
const config = useRuntimeConfig();

const pid = useRoute().params.pid;

const headers = {
  // authentication header and jwt here
  // bearerAuth
  Authorization: `Bearer ${getBearerToken(config)}`,
};

const {
  data: post,
  error,
  pending,
} = await useFetch(
  `/api/projects/${pid}`,
  // `${config.public.apiBase}/projects/${pid}`,
  { query: { apiKey: config.public.apiKey } },
  {
    headers,
    pick: ['project'],
  },
);

const getContactInfo = (contacts) => {
  if (!contacts.length) {
    return [{ name: 'Unknown contact' }];
  }

  return contacts.map((contact) => {
    return {
      name: contact.fullName,
      email: contact.primaryEmail,
    };
  });
};
</script>

<style lang="scss" scoped>
.projectInfo {
  display: flex;
  gap: var(--spacing-md);

  &__sidebar {
    min-width: 250px;
    padding: var(--spacing-sm);
    background: var(--sidebar);
    border-radius: var(--border-radius);

    aside:not(:last-child) {
      margin: 0 0 var(--spacing-md);
      padding: 0 0 var(--spacing-md);
      border-bottom: 1px solid var(--border);
    }

    aside {
      &:first-of-type {
        padding-top: var(--spacing-xs);
      }

      h2 {
        margin: 0 0 var(--spacing-md);
      }
    }
  }

  &__link {
    display: inline-block;

    &:not(:first-of-type) {
      margin-top: var(--spacing-xs);
    }
  }
}

dl {
  display: grid;
  grid-gap: var(--spacing-sm) var(--spacing-md);
  grid-template-columns: auto;
  margin: 0;

  dt {
    font-weight: bold;
  }

  dd {
    margin: 0 0 var(--spacing-sm);
    grid-column-start: 1;
  }

  &.twoColumns {
    grid-template-columns: 1fr 1fr;

    dt {
      font-weight: bold;
      min-width: 140px;
    }

    dd {
      margin: 0;
      grid-column-start: 2;
      text-align: right;
    }
  }
}
</style>
