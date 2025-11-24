interface Exp {
  /**
   * 执行 SQL 查询或命令
   * @param args 传递给 SQL 引擎的参数，具体类型依实现而定
   * @returns 查询结果的 Promise
   */
  sql(...args: any[]): Promise<any>;
}

interface Window {
  exp: Exp;
}
