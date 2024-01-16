<template>
  <div>
    <!-- <Head>
      <Title>{{ post?.project?.title }}</Title>
      <Meta
        name="description"
        :content="stripHtmlTags(post?.project?.description)"
      />
    </Head> -->

    <div v-if="error">
      <p>{{ error }}</p>

      <clearApiToken />
    </div>

    <div v-else-if="pending">pending</div>

    <div v-else>
      <main class="projectInfo">
        <article class="projectInfo__main">
          <p
            v-show="post?.project?.program?.title"
            class="projectInfo__headline"
          >
            {{ post?.project?.program?.title }}
          </p>

          <div class="projectInfo__title">
            <h1>{{ post?.project?.title }}</h1>

            <span
              :class="[
                'projectStatus',
                `projectStatus--${post.project.statusDescription.toLowerCase()}`,
              ]"
            >
              <ClientOnly>
                <IconCSS
                  :key="post.project.statusDescription"
                  class="icon"
                  :name="getStatusIcon(post.project.statusDescription)"
                />
              </ClientOnly>
              {{ post.project.statusDescription }}
            </span>
          </div>

          <h2>Description</h2>
          <div v-html="post?.project?.description" />

          <h2>Benefits</h2>
          <div v-html="post?.project?.benefits" />

          <h2>Project Information</h2>

          <div class="projectInfo__info">
            <div class="projectInfo__card">
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
            </div>

            <div class="projectInfo__card">
              <h3>Organizational Responsibility</h3>

              <dl>
                <dt>Responsible Mission Directorate:</dt>
                <dd>
                  {{ post?.project?.responsibleMd?.organizationName }}
                  <span v-show="post?.project?.responsibleMd?.acronym">
                    ({{ post?.project?.responsibleMd?.acronym }})
                  </span>
                </dd>

                <dt>Lead Center / Facility:</dt>
                <dd>
                  {{ post?.project?.leadOrganization?.organizationName }}
                  <span v-show="post?.project?.leadOrganization?.acronym">
                    ({{ post?.project?.leadOrganization?.acronym }})
                  </span>
                </dd>

                <dt>Responsible Program:</dt>
                <dd>{{ post?.project?.program?.title }}</dd>
              </dl>
            </div>
          </div>
        </article>

        <div class="projectInfo__sidebar">
          <img
            v-if="post?.project?.primaryImage"
            :src="setImageUrl(post?.project?.primaryImage.file)"
            :alt="post?.project?.primaryImage?.description"
          />

          <aside>
            <h2>Project Summary</h2>
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

              <dt>Completion date:</dt>

              <dd>
                {{ post.project.endDateString }}
              </dd>
            </dl>

            <a
              v-show="post?.project?.website"
              class="projectInfo__button"
              :href="post?.project?.website"
              target="_blank"
            >
              <ClientOnly>
                <IconCSS
                  class="icon"
                  name="streamline:interface-arrows-expand-4-expand-small-bigger-retract-smaller-big"
                />
              </ClientOnly>
              View website
            </a>
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
} = await useFetch(`/api/projects/${pid}`, {
  headers,
});

// const {
//   data: post,
//   error,
//   pending,
// } = await useAsyncData('projects', () =>
//   $fetch(`/api/projects/${pid}`, {
//     headers,
//   }),
// );

const { project } = await $fetch(`/api/projects/${pid}`);

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

const setImageUrl = (file) => {
  if (file) {
    return `https://techport.nasa.gov/image/${file.fileId}`;
  }
};

const stripHtmlTags = (content) => content?.replace(/(<([^>]+)>)/gi, '');

useServerSeoMeta({
  title: () => project?.title,
  description: () => stripHtmlTags(project?.description),
  ogTitle: () => project?.title,
  ogDescription: () => stripHtmlTags(project?.description),
  ogImage: () => setImageUrl(project?.primaryImage.file),
  twitterCard: () => 'summary_large_image',
});
</script>

<style lang="scss" scoped>
.projectInfo {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);

  article {
    flex: 1;
  }

  &__headline {
    font-weight: 700;
    margin: 0;
  }

  &__title {
    margin: var(--spacing-xs) 0 var(--spacing);
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  &__image {
    margin: 0 0 var(--spacing);
  }

  &__button {
    margin-top: var(--spacing);
    padding: var(--spacing-sm);
    color: var(--white);
    background: var(--primary);
    text-decoration: none;
    border-radius: var(--border-radius);
    display: inline-flex;
    align-items: center;
  }

  &__sidebar {
    width: 280px;
    position: sticky;
    top: var(--spacing-sm);
    background: var(--sidebar);
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);

    img {
      width: 100%;
      border-radius: var(--border-radius) var(--border-radius) 0 0;
    }

    aside {
      margin: var(--spacing);

      h2 {
        margin: 0 0 var(--spacing-md);
      }
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing);
  }

  &__card {
    padding: var(--spacing) 0;
    flex: 1 0 50%;
    border-radius: var(--border-radius);

    h3 {
      margin: 0 0 var(--spacing-sm);
    }
  }

  .icon {
    margin-right: var(--spacing-sm);
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
}

dl {
  display: grid;
  grid-gap: var(--spacing-sm) var(--spacing-md);
  grid-template-columns: auto;
  margin: 0;

  :deep(dt) {
    font-weight: 500;
  }

  :deep(dd) {
    margin: 0 0 var(--spacing-sm);
    grid-column-start: 1;
  }

  &.twoColumns {
    grid-template-columns: 1fr 1fr;

    dt {
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
