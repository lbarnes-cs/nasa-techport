import type { ProjectSummary } from '@/types/ProjectSearchResponse';

export const paginate = ({
  perPage,
  currentPage,
  list: items,
}: {
  perPage: number;
  currentPage: number;
  list: Array<ProjectSummary>;
}) => {
  const offset = perPage * (currentPage - 1);
  const totalPages = Math.ceil(items.length / perPage);
  const paginatedItems = items.slice(offset, perPage * currentPage);

  return {
    previousPage: currentPage - 1 ? currentPage - 1 : null,
    nextPage: totalPages > currentPage ? currentPage + 1 : null,
    total: items.length,
    totalPages: Math.ceil(items.length / perPage),
    items: paginatedItems,
  };
};
