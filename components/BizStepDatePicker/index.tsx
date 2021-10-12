import React from 'react';
import moment, { DurationInputArg2 } from 'moment';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, DatePicker, DatePickerProps } from 'antd';
import styles from './index.less';
import { useState } from 'react-router/node_modules/@types/react';

// DatePickerProps 是 type 方式，这里只能使用 type 方式声明
type BizDayStepPickerProps = Omit<DatePickerProps, 'picker'> & {
  picker: 'date' | 'month';
};

const pickerUnitMap = {
  date: 'day',
  month: 'month',
};

/**
 * BizDatePicker 组件，除可手动选择外，左右添加按钮进行前进后退等操作
 */
const BizDayStepPicker: React.FC<BizDayStepPickerProps> = (props) => {
  const { value, onChange, picker = 'date', ...rest } = props;

  // const datePickerRef = useRef();
  // const [showWeekDay, setShowWeekDay] = useState(false);

  function plusOneStep() {
    const newVal = moment(value).add(1, pickerUnitMap[picker] as DurationInputArg2);

    if (onChange) {
      onChange(newVal);
    }
  }

  function minusOneStep() {
    const newVal = moment(value).subtract(1, 'day');

    if (onChange) {
      onChange(newVal);
    }
  }

  // useEffect(() => {
  //   // 监听 window size 变化，动态控制是否显示【星期几】
  //   function handleSizeChange() {
  //     if (datePickerRef.current) {
  //       const dom = datePickerRef.current;

  //       if (dom.offsetWidth > 142) {
  //         setShowWeekDay(true);
  //       } else {
  //         setShowWeekDay(false);
  //       }
  //     }
  //   }

  //   handleSizeChange();
  //   window.addEventListener('resize', handleSizeChange);

  //   return () => window.removeEventListener('resize', handleSizeChange)
  // }, [])

  return (
    <Button.Group className={styles.container}>
      <Button
        icon={<LeftOutlined style={{ fontSize: 12 }} />}
        className={styles.leftBtn}
        onClick={minusOneStep}
      />
      <div
        // ref={datePickerRef}
        className={styles.datePickerContainer}
      >
        <DatePicker
          {...rest}
          value={value}
          onChange={onChange}
          className={styles.datePicker}
          // format={showWeekDay ? 'YYYY-MM-DD dddd' : 'YYYY-MM-DD' }
        />
      </div>
      <Button
        icon={<RightOutlined style={{ fontSize: 12 }} />}
        className={styles.rightBtn}
        onClick={plusOneStep}
      />
    </Button.Group>
  );
};

export default BizDayStepPicker;
