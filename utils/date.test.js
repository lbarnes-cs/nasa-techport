import { beforeAll, afterAll, vi, expect, it, describe } from 'vitest';
import { getCurrentDate, formatDateToString, getPreviousDate } from './date';

describe('Date Util', () => {
  beforeAll(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  afterAll(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  it('Should getCurrentDate return the mocked date', () => {
    const mockDate = new Date(Date.UTC(2024, 0, 8, 3, 4, 5));

    vi.setSystemTime(mockDate);
    const currentDate = getCurrentDate();

    expect(currentDate.toISOString()).toContain('2024-01-08');
  });

  it('Should formatDateToString return the mock date as YYY-MM-DD', () => {
    const mockDate = new Date(Date.UTC(2024, 0, 1, 3, 4, 5));

    vi.setSystemTime(mockDate);

    expect(formatDateToString(new Date())).toBe('2024-01-01');
  });

  it('Should getPreviousDate return the previous 7th day from the mock date', () => {
    const mockDate = new Date(Date.UTC(2024, 0, 8, 3, 4, 5));

    vi.setSystemTime(mockDate);
    const previousDate = getPreviousDate(7);

    expect(previousDate.toISOString()).toContain('2024-01-01');
  });

  it('Should getPreviousDate and formatDateToString return the past date and formatted YYY-MM-DD', () => {
    const mockDate = new Date(Date.UTC(2024, 0, 8, 3, 4, 5));

    vi.setSystemTime(mockDate);
    const previousDate = getPreviousDate(7);

    expect(formatDateToString(previousDate)).toBe('2024-01-01');
  });
});
