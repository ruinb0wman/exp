import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'LAST_DAILY_ACTION_DATE';

/**
 * 定义回调函数的类型：可以是同步也可以是异步
 */
type DailyActionCallback = () => void | Promise<void>;

/**
 * 获取本地日期字符串 (格式: YYYY-MM-DD)
 */
const getLocalDateString = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const useDailyCheck = (actionCallback: DailyActionCallback) => {
  // 显式定义 useRef 的泛型为 AppStateStatus
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const checkAndRun = async () => {
    try {
      const today = getLocalDateString();
      const lastDate = await AsyncStorage.getItem(STORAGE_KEY);

      if (lastDate !== today) {
        console.log(`[DailyCheck] 执行操作: 上次 ${lastDate || '无记录'}, 今天 ${today}`);

        // 等待回调执行完成（如果是异步的）
        await actionCallback();

        // 更新存储
        await AsyncStorage.setItem(STORAGE_KEY, today);
      } else {
        console.log('[DailyCheck] 今日已执行，跳过。');
      }
    } catch (error) {
      console.error('[DailyCheck] Error:', error);
    }
  };

  useEffect(() => {
    // 1. 冷启动检查
    checkAndRun();

    // 2. 状态变化监听
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('[DailyCheck] App 回到前台，检查日期...');
        checkAndRun();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [actionCallback]); // 建议将 actionCallback 加入依赖，或者确保它是稳定的
};
