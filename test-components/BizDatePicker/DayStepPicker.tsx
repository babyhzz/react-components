import React from 'react';
import moment from 'moment';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, DatePicker, DatePickerProps } from 'antd';
import styles from './DayStepPicker.less';

// DatePickerProps 是 type 方式，这里只能使用 type 方式声明
type DayStepPickerProps = DatePickerProps & {

}

/**
 * BizDatePicker 组件
 */

const DayStepPicker: React.FC<DayStepPickerProps> = (props) => {
  const { value, onChange, ...rest } = props;

  // const datePickerRef = useRef();
  // const [showWeekDay, setShowWeekDay] = useState(false);

  function plusOneDay() {
    const newVal = moment(value).add(1, 'day');

    // if (onChange) {
    //   onChange(newVal);
    // }
  }

  function minusOneDay() {
    const newVal = moment(value).subtract(1, 'day');

    // if (onChange) {
    //   onChange(newVal);
    // }
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
        onClick={minusOneDay}
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
        onClick={plusOneDay}
      />
    </Button.Group>
  );
}

export default DayStepPicker;
