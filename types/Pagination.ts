import type { ProjectSummary } from '@/types/ProjectSearchResponse';

export type PaginateType = {
  previousPage: number;
  nextPage: number;
  totalPages: number;
  items?: Array<ProjectSummary>;
};

export type PaginationComponentType = Omit<PaginateType, 'items'> & {
  currentPage: number;
};
