import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// 定义日期数据类型
interface DayData {
  day: number;
  hasData?: boolean;
  isToday?: boolean;
  isCurrentMonth?: boolean;
  date: Date;
}

// 定义组件属性类型
interface CalendarViewProps {
  date?: number | string | Date; // 当前选中的日期
  onChange?: (date: Date) => void; // 日期改变时的回调
  cell?: ({ timeStamp, date }: { timeStamp: number; date: string }) => React.ReactNode; // 自定义单元格渲染函数
  style?: object; // 容器样式
  calendarStyle?: object; // 日历样式
}

const CalendarView: React.FC<CalendarViewProps> = ({
  date,
  onChange,
  cell,
  style,
  calendarStyle
}) => {
  // 状态管理
  const [selectedDate, setSelectedDate] = useState<Date>(date ? new Date(date) : new Date());
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [days, setDays] = useState<DayData[]>([]);

  // 生成日历天数
  useEffect(() => {
    generateCalendarDays();
  }, [currentMonth, currentYear]);

  // 生成日历天数
  const generateCalendarDays = () => {
    const daysArray: DayData[] = [];

    // 获取当月第一天是星期几
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    // 获取当月总天数
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // 获取今天日期
    const today = new Date();
    const isToday = (day: number) =>
      today.getFullYear() === currentYear &&
      today.getMonth() === currentMonth &&
      today.getDate() === day;

    // 添加上个月的空白天数
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = 0; i < firstDay; i++) {
      const day = prevMonthDays - firstDay + i + 1;
      daysArray.push({
        day,
        isCurrentMonth: false,
        date: new Date(currentYear, currentMonth - 1, day),
        isToday: isToday(day)
      });
    }

    // 添加当前月的天数
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push({
        day,
        isCurrentMonth: true,
        date: new Date(currentYear, currentMonth, day),
        isToday: isToday(day)
      });
    }

    // 添加下个月的空白天数（确保总共42个格子，6行7列）
    const totalCells = 42; // 6行 * 7列
    const remainingDays = totalCells - daysArray.length;
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(currentYear, currentMonth + 1, i),
        isToday: isToday(i)
      });
    }

    setDays(daysArray);
  };

  // 处理月份切换
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // 获取月份名称
  const getMonthName = (month: number): string => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month];
  };

  // 处理日期选择
  const handleDateSelect = (dayData: DayData) => {
    if (!dayData.isCurrentMonth) return; // 只允许选择当前月的日期

    const newDate = dayData.date;
    setSelectedDate(newDate);
    onChange?.(newDate);
  };

  // 渲染日期单元格
  const renderDayCell = (dayData: DayData) => {
    if (cell) {
      // 使用自定义单元格渲染
      const timestamp = dayData.date.getTime();
      const dateString = dayData.date.toISOString().split('T')[0];
      return (
        <TouchableOpacity
          key={`day-${dayData.date.getTime()}`}
          style={[
            styles.dayButton,
            !dayData.isCurrentMonth && styles.outsideMonth,
            dayData.date.toDateString() === selectedDate.toDateString() && styles.selectedDay,
            dayData.isToday && styles.today
          ]}
          onPress={() => handleDateSelect(dayData)}
        >
          <View style={styles.dayContent}>
            {cell({ timeStamp: timestamp, date: dateString })}
          </View>
        </TouchableOpacity>
      );
    } else {
      // 默认渲染日期
      return (
        <TouchableOpacity
          key={`day-${dayData.date.getTime()}`}
          style={[
            styles.dayButton,
            !dayData.isCurrentMonth && styles.outsideMonth,
            dayData.date.toDateString() === selectedDate.toDateString() && styles.selectedDay,
            dayData.isToday && styles.today
          ]}
          onPress={() => handleDateSelect(dayData)}
        >
          <View style={styles.dayContent}>
            <Text style={[
              styles.dayNumber,
              !dayData.isCurrentMonth && styles.outsideMonthText,
              dayData.date.toDateString() === selectedDate.toDateString() && styles.selectedDayText,
              dayData.isToday && styles.todayText
            ]}>
              {dayData.day}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const monthName = getMonthName(currentMonth);

  return (
    <View style={[styles.container, style]}>
      {/* 月份导航 */}
      <View style={styles.monthNavigation}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
          <Text style={styles.navIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{monthName} {currentYear}</Text>
        <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
          <Text style={styles.navIcon}>›</Text>
        </TouchableOpacity>
      </View>

      {/* 星期标题 */}
      <View style={styles.dayHeaders}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <Text key={`header-${index}`} style={styles.dayHeader}>
            {day}
          </Text>
        ))}
      </View>

      {/* 日期网格 */}
      <View style={[styles.daysGrid, calendarStyle]}>
        {days.map(renderDayCell)}
      </View>
    </View>
  );
};

// 样式定义
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#101922',
    padding: 16,
    borderRadius: 8,
  },
  monthNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dayHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dayHeader: {
    width: 48,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#A1A1AA',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayButton: {
    width: '14.28%', // 100% / 7
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContent: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  selectedDay: {
    backgroundColor: '#2b8cee',
    borderRadius: 20,
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  today: {
    borderWidth: 1,
    borderColor: '#2b8cee',
    borderRadius: 20,
  },
  todayText: {
    color: '#2b8cee',
  },
  outsideMonth: {
    opacity: 0.5,
  },
  outsideMonthText: {
    color: '#52525B',
  },
});

export default CalendarView;
