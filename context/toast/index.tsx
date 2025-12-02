// components/ToastProvider.tsx
import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Animated, Text, StyleSheet, Easing } from 'react-native';

// ====== 类型定义 ======
export type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  type?: ToastType;
  duration?: number;
}

interface ToastRef {
  show: (message: string, type?: ToastType, duration?: number) => void;
}

interface ToastContextValue {
  show: (message: string, options?: ToastOptions) => void;
  // 重载方法（可选，提升使用体验）
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

// ====== 样式与常量 ======
const TYPE_COLORS: Record<ToastType, string> = {
  success: '#4CAF50',
  error: '#F44336',
  info: '#2196F3',
};

const DEFAULT_DURATION = 2500;

// ====== 内部 Toast 组件（不可见）======
const ToastInternal = forwardRef<ToastRef>((_, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('info');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const show = useCallback(
    (msg: string, toastType: ToastType = 'info', duration: number = DEFAULT_DURATION) => {
      setMessage(msg);
      setType(toastType);
      setIsVisible(true);

      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      // 自动隐藏
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start(() => {
          setIsVisible(false);
        });
      }, duration);
    },
    [fadeAnim]
  );

  useImperativeHandle(ref, () => ({ show }), [show]);

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: TYPE_COLORS[type],
          opacity: fadeAnim,
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
});

// ====== Context 与 Provider ======
const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const toastRef = useRef<ToastRef>(null);

  // 核心 show 方法（稳定引用）
  const show = useCallback((message: string, options?: ToastOptions) => {
    const { type = 'info', duration = DEFAULT_DURATION } = options || {};
    toastRef.current?.show(message, type, duration);
  }, []);

  // 快捷方法
  const success = useCallback((message: string, duration?: number) => {
    show(message, { type: 'success', duration });
  }, [show]);

  const error = useCallback((message: string, duration?: number) => {
    show(message, { type: 'error', duration });
  }, [show]);

  const info = useCallback((message: string, duration?: number) => {
    show(message, { type: 'info', duration });
  }, [show]);

  // 稳定的 context value（关键！避免 consumer 重渲染）
  const contextValue = useMemo(
    () => ({ show, success, error, info }),
    [show, success, error, info]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastInternal ref={toastRef} />
    </ToastContext.Provider>
  );
};

// ====== 自定义 Hook ======
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// ====== 样式 ======
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 60,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    // elevation for Android shadow (optional)
    elevation: 4,
    // shadow for iOS (optional)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
