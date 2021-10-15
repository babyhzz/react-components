import React, { useMemo, useState } from 'react';
import moment, {  unitOfTime } from 'moment';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, DatePicker, DatePickerProps } from 'antd';
import styles from './index.less';

type Step = -1 | 1;
type PickerMode = "date" | "week" | "month" | "year";

type BizStepDatePickerProps = Pick<DatePickerProps, 
  "format" | "value" | "onChange"
> & {
  picker: PickerMode;
};

type PickerMomentUnit = Extract<unitOfTime.Base, 'year' | 'month' | 'week' | 'day'>;
const unitMap: {
  [p in PickerMode]: PickerMomentUnit
} = {
  date: 'day',
  week: 'week',
  month: 'month',
  year: 'year',
}

/**
 * BizStepDatePicker 组件，除可手动选择外，左右添加按钮进行前进后退等操作
 */
const BizStepDatePicker: React.FC<BizStepDatePickerProps> = (props) => {
  const { value, onChange, picker = 'date', ...rest } = props;

  const [currentVal, setCurrentVal] = useState(value);

  if (value !== undefined && value !== currentVal) {
    setCurrentVal(value);
  }

  function oneStepChange(step: Step) {
    const newVal = moment(currentVal).add(step, unitMap[picker]);
    setCurrentVal(newVal);
    // if (onChange) {
    //   onChange(newVal);
    // }
  }

  function plusOneStep() {
    oneStepChange(1);
  }

  function minusOneStep() {
    oneStepChange(-1);
  }

  const format = useMemo(() => {
    if (picker === 'date') {
      return 'YYYY-MM-DD';
    } else if (picker === 'month') {
      return 'YYYY-MM';
    } else if (picker === 'year') {
      return 'YYYY';
    } else if (picker === 'week') {
      return value => {
        const firstWeekday = moment(value).startOf('week').format('YYYY-MM-DD');
        const lastWeekday = moment(value).endOf('week').format('YYYY-MM-DD');
        return `${firstWeekday} ~ ${lastWeekday}`
      }
    }
  }, [picker])

  return (
    <Button.Group className={styles.container}>
      <Button
        icon={<LeftOutlined style={{ fontSize: 12 }} />}
        className={styles.leftBtn}
        onClick={minusOneStep}
      />
      <div
        className={styles.datePickerContainer}
      >
        <DatePicker
          picker={picker}
          value={currentVal}
          className={styles.datePicker}
          allowClear={false}
          format={format}
          onChange={onChange}
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

export default BizStepDatePicker;
