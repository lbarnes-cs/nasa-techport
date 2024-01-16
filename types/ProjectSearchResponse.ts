export type ProjectSummary = {
  projectId: number;
  title?: string;
  acronym?: string;
  website?: string;
  lastUpdated?: string;
};

export type ProjectsResponseBody = {
  totalCount: number;
  projects: ProjectSummary[];
};
