import { Input, InputProps } from 'antd';
import React, { useRef } from 'react';
import './index.less';

interface BizInputProps extends InputProps {

}

/**
 * 基于 Ant Design 的 Input 组件开发，属性功能保持一致，主要修改：
 * 1. 兼容输入法输入动作，对于使用拼音输入法过程中的输入，不触发 onChange 事件
 * 2. onChange 事件的参数从合成事件 SyntheticEvent 变更为目标值
 */
const BizInput: React.FC<BizInputProps> = ({ onChange, ...restProps }) => {
  const isComposition = useRef(false);

  // 仅处理非输入法情况
  function handleInputChange(e) {
    if (onChange && !isComposition.current) {
      onChange(e.target.value);
    }
  }

  // 处理输入法情况
  function handleCompositionStart() {
    isComposition.current = true;
  }

  function handleCompositionEnd(e) {
    isComposition.current = false;
    if (onChange) {
      onChange(e.target.value);
    }
  }

  return (
    <Input
      onChange={handleInputChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      {...restProps}
    />
  );
};

export default BizInput;
