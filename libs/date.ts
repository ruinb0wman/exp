/**
 * 获取今天零点（00:00:00）的时间戳（毫秒）
 */
export function getTodayTimestamp(): number {
  // 为避免时间戳转换为本地时间, 使用时间字符串创建Date后生成时间戳
  return new Date(getTodayDateString()).getTime();
}

/**
 * 获取今天的日期字符串，格式为 'YYYY-MM-DD'
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需+1
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
