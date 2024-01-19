import { expect, it } from 'vitest';
import projectSummaryList from '../tests/fixations/projectSummaryList.json';
import { paginate } from './pagination';

const list = projectSummaryList?.projects;
const perPage = 10;
const currentPage = 1;

describe('Date Util', () => {
  it('Should have an empty list, when items are zero', () => {
    const response = paginate({ perPage, currentPage, list: [] });

    expect(response.items.length).toBe(0);
  });

  it('Should return item is the same of perPage', () => {
    const response = paginate({ perPage, currentPage, list });

    expect(response.items.length).toBe(perPage);
  });

  it('Should have the total pages is divided up based upon the perPage', () => {
    const totalPages = Math.ceil(list.length / perPage);
    const response = paginate({ perPage, currentPage, list });

    expect(response.totalPages).toBe(totalPages);
  });

  it('Should display the page number for previousPage and NextPage on currentPage 1', () => {
    const response = paginate({ perPage, currentPage, list });

    expect(response.previousPage).toBe(currentPage - 1);
    expect(response.nextPage).toBe(currentPage + 1);
  });
});
