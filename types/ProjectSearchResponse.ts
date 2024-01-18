export type ProjectSummary = {
  projectId: number;
  title: string;
  acronym?: string;
  website?: string;
  lastUpdated?: string;
  // Further details needed
  endDateString?: string;
  startDateString?: string;
  statusDescription?: string;
};

export type ProjectsResponseBodyType = {
  totalCount: number;
  projects: ProjectSummary[];
};
