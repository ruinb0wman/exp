import { useState, Dispatch, SetStateAction } from "react";

// 约束 T 必须是对象
export function useCustomState<T extends Record<string, any>>(init: T) {
  const [state, setState] = useState(init);

  // 泛型 key 和 value，更安全
  const updateState = <K extends keyof T>(key: K, value: T[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  // 显式返回元组类型
  return [state, setState, updateState] as const;
}
