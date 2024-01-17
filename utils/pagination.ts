import type { ProjectSummary } from '@/types/ProjectSearchResponse';

export const paginate = ({
  perPage,
  currentPage,
  list: items,
}: {
  perPage: number;
  currentPage: number;
  list?: Array<ProjectSummary>;
}) => {
  const listLength = items?.length || 0;

  const offset: number = perPage * (currentPage - 1);
  const totalPages: number = Math.ceil(listLength / perPage);
  const paginatedItems: Array<ProjectSummary> =
    items?.slice(offset, perPage * currentPage) || [];

  return {
    previousPage: currentPage - 1 ? currentPage - 1 : 0,
    nextPage: totalPages > currentPage ? currentPage + 1 : 0,
    totalPages: Math.ceil(listLength / perPage),
    items: paginatedItems,
  };
};
