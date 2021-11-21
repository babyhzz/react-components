import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, DatePicker } from 'antd';
import styles from './index.less';
import PropTypes from 'prop-types';

const unitMap = {
  date: 'day',
  week: 'week',
  month: 'month',
  year: 'year',
}

/**
 * BizStepDatePicker 组件，除可手动选择外，左右添加按钮进行前进后退等操作
 */
const BizStepDatePicker = (props) => {
  const { value, onChange, picker, ...rest } = props;

  function oneStepChange(step) {
    const newVal = moment(value).add(step, unitMap[picker]);
    if (onChange) {
      onChange(newVal);
    }
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
          {...rest}
          value={value}
          picker={picker}
          format={format}
          allowClear={false}
          className={styles.datePicker}
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

BizStepDatePicker.propTypes = {
  /**
   * 以何种方式展示，天/周/月/年
   */
  picker: PropTypes.oneOf(["date", 'week', 'month', 'year']),


  value: PropTypes.instanceOf(moment),
}

BizStepDatePicker.defaultProps = {
  picker: "date",
  value: moment(),
}

export default BizStepDatePicker;
