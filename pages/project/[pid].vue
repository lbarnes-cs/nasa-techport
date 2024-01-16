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
          <p v-if="post?.project?.program?.title" class="projectInfo__headline">
            {{ post?.project?.program?.title }}
          </p>

          <div class="projectInfo__title">
            <h1 class="">{{ post.project.title }}</h1>

            <span
              :class="[
                'projectStatus',
                `projectStatus--${post.project.statusDescription.toLowerCase()}`,
              ]"
            >
              <IconCSS
                class="projectStatus__icon"
                :name="getStatusIcon(post.project.statusDescription)"
              />
              {{ post.project.statusDescription }}
            </span>
          </div>

          <h2>Description:</h2>
          <p v-html="post?.project?.description" />

          <h2>Benefits</h2>
          <p v-html="post?.project?.benefits" />
        </article>

        <div class="projectInfo__sidebar">
          <aside>
            <h3>Project Summary</h3>
            <dl class="twoColumns">
              <dt>Views:</dt>
              <dd>
                {{ post.project.viewCount }}
              </dd>

              <dt>Last updated:</dt>
              <dd>
                {{ post.project.lastUpdated }}
              </dd>

              <dt>Start date:</dt>
              <dd>{{ post.project.startDateString }}</dd>

              <dt v-if="post.project.statusDescription === 'Completed'">
                Completion date:
              </dt>
              <dd v-if="post.project.statusDescription === 'Completed'">
                {{ post.project.endDateString }}
              </dd>
            </dl>
          </aside>

          <aside>
            <h3>Organizational Responsibility</h3>

            <dl>
              <dt>Responsible Mission Directorate:</dt>
              <dd>
                {{ post?.project?.responsibleMd?.organizationName }}
                <template v-if="post?.project?.responsibleMd?.acronym">
                  ({{ post?.project?.responsibleMd?.acronym }})
                </template>
              </dd>

              <dt>Lead Center / Facility:</dt>
              <dd>
                {{ post?.project?.leadOrganization?.organizationName }}
                <template v-if="post?.project?.leadOrganization?.acronym">
                  ({{ post?.project?.leadOrganization?.acronym }})
                </template>
              </dd>

              <dt>Responsible Program:</dt>
              <dd>{{ post?.project?.program?.title }}</dd>
            </dl>
          </aside>

          <aside>
            <h3>Project Management</h3>
            <dl>
              <contactInformation
                v-if="post?.project?.programManagers"
                title="Program Manager"
                :contacts="post?.project?.programManagers"
              />

              <contactInformation
                v-if="post?.project?.programManagers"
                title="Project Managers"
                :contacts="post?.project?.programManagers"
              />

              <contactInformation
                v-if="post?.project?.principalInvestigators"
                title="Principal Investigator"
                :contacts="post?.project?.principalInvestigators"
              />

              <contactInformation
                v-if="post?.project?.coInvestigators"
                title="Co-Investigators"
                :contacts="post?.project?.coInvestigators"
              />
            </dl>
          </aside>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { getBearerToken } from '@/utils/apiToken';

import contactInformation from '@/components/sidebar/contactInformation';

const config = useRuntimeConfig();

const pid = useRoute().params.pid;

const headers = {
  Authorization: `Bearer ${getBearerToken(config)}`,
};

const {
  data: post,
  error,
  pending,
} = await useFetch(
  `/api/projects/${pid}`,
  { query: { apiKey: config.public.apiKey } },
  {
    headers,
    pick: ['project'],
  },
);

const getStatusIcon = (status) => {
  switch (status) {
    case 'Completed':
      return 'streamline:interface-validation-check-circle-checkmark-addition-circle-success-check-validation-add-form';
    case 'Canceled':
      return 'streamline:interface-delete-circle-button-delete-remove-add-circle-buttons';
    default:
      return 'streamline:interface-time-reset-time-clock-reset-stopwatch-circle-measure-loading';
  }
};
</script>

<style lang="scss" scoped>
.projectInfo {
  display: flex;
  gap: var(--spacing-md);

  article {
    flex: 1;
  }

  &__headline {
    font-weight: 700;
    margin: 0;
  }

  &__title {
    margin-top: var(--spacing-xs);
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  &__sidebar {
    width: 250px;
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

      h3 {
        margin: 0 0 var(--spacing-md);
      }
    }
  }
}

.projectStatus {
  border-radius: var(--border-radius);
  color: var(--white);
  padding: var(--spacing-xs) var(--spacing-sm);
  display: inline-flex;
  align-items: center;
  font-weight: 400;
  margin-left: var(--spacing-md);

  &--active {
    background: var(--status-active);
  }

  &--completed {
    background: var(--status-completed);
  }

  &--canceled {
    background: var(--status-canceled);
  }

  &__icon {
    margin-right: var(--spacing-xs);
  }
}

dl {
  display: grid;
  grid-gap: var(--spacing-sm) var(--spacing-md);
  grid-template-columns: auto;
  margin: 0;

  :deep(dt) {
    font-weight: bold;
  }

  :deep(dd) {
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
