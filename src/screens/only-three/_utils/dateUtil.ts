/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 */
export function getTodayString(): string {
  const now = new Date();
  return formatDateToString(now);
}

/**
 * Date 객체를 YYYY-MM-DD 형식으로 변환
 */
export function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * 어제 날짜를 YYYY-MM-DD 형식으로 반환
 */
export function getYesterdayString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return formatDateToString(yesterday);
}

/**
 * 두 날짜가 연속인지 확인 (date1이 date2의 바로 전날인지)
 */
export function isConsecutiveDay(date1: string, date2: string): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = d2.getTime() - d1.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays === 1;
}

/**
 * 특정 날짜로부터 N일 전 날짜 반환
 */
export function getDaysAgo(days: number, fromDate?: string): string {
  const date = fromDate ? new Date(fromDate) : new Date();
  date.setDate(date.getDate() - days);
  return formatDateToString(date);
}
