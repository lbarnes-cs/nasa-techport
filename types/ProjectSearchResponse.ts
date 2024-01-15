type ProjectSummary = {
  acronym: string;
  title: string;
  website: string;
  lastUpdated: string;
};

export type ProjectsResponseBody = {
  totalCount: number;
  projects: ProjectSummary[];
};
