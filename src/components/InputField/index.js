import React from 'react';
import Form from 'react-bootstrap/Form';
import { PropTypes } from 'prop-types';

/*
  To use this component, pass these props:

  > as           : The underlying HTML element to use when rendering the FormControl.
                   Possible value are "input" or "textarea"

  > ref          : Pass any value 

  > type         : Pass a string value that can be used to identify the input field.
                    Posible value are "text", "email" or "password"

  > value        : Pass a string value input
                   Possible input is what the user put or write in the input field

  > onChange     : Pass a function value.

  > isInvalid    : You need to pass the error, you can test this by using boolean

  > fieldSize    : Pass the size's of the input field by lg, md, and sm
                   Possible value are "lg", "md" or "sm"


  > placeholder  : Pass a string value for the placeholder
                   Possible value sentence for EX. "Category Name"

*/

import style from './index.module.scss';

const InputField = ({
  as,
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
      as={as}
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
  as: PropTypes.string,
  ref: PropTypes.any,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isInvalid: PropTypes.bool,
  fieldSize: PropTypes.string,
  placeholder: PropTypes.string
};

export default InputField;
