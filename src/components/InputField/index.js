import React from 'react';
import Form from 'react-bootstrap/Form';
import { PropTypes } from 'prop-types';

/*
  To use this component, pass these props:

  > ref          : Pass any value

  > type         : Pass a string value that can be used to identify the input field.

  > value        : Pass a string value input

  > onChange     : Pass a string value.

  > isInvalid    : Pass the error

  > fieldSize    : Pass the size's of the input field by lg, md, and sm

  > placeholder  : Pass a string value for the placeholder

*/

import style from './index.module.scss';

const InputField = ({
  ref,
  type,
  value,
  onChange,
  fieldSize,
  isInvalid,
  placeholder,
    
}) => {

  function styleSize() {
        
    switch(fieldSize) {
    case 'lg':
      return style.lg;
    case 'md':
      return style.md;
    case 'sm':
      return style.sm;
    }
  }

  return (
    <Form.Control
      ref={ref}
      type={type}
      value={value}
      onChange={onChange}
      isInvalid={isInvalid}
      className={styleSize()}
      placeholder={placeholder}
    />
  );
};

InputField.propTypes = {
  ref: PropTypes.any,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.string,
  isInvalid: PropTypes.bool,
  fieldSize: PropTypes.string,
  placeholder: PropTypes.string
};

export default InputField;
