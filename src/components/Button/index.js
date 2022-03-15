import React from 'react';
import { PropTypes } from 'prop-types';
import Button from 'react-bootstrap/Button';
import style from './index.module.scss';

/*
    To use this component, pass the following props:
    
    > buttonLabel : Pass a string value for the button label.
    
    > buttonSize : Pass the size's of the input field by lg, def, and sm

    > Outline : Pass true if you want to have an outline button. 
                otherwise it will return default button.
                
    > disabled: Pass disabled if you want to have a disable button.
*/

const ButtonComponent = ({
  buttonLabel,
  buttonSize,
  disabled,
  outline = false

}) => {

  const sizeButton = () => {
    switch(buttonSize) {
    case 'lg':
      return style.large;
    case 'def':
      return style.default;
    case 'sm':
      return style.small;
    }
  };

  const isOutline = () => {
    return outline ? style.outlineButton : '';
  };

  return (
    <div>
      <Button className={`${style.defaultButton} ${sizeButton()} ${isOutline()}`} disabled={disabled} >
        {buttonLabel}
      </Button>
    </div>
  );
};

ButtonComponent.propTypes = {
  buttonLabel: PropTypes.string,
  buttonSize: PropTypes.string,
  disabled: PropTypes.bool,
  outline: PropTypes.bool
};

export default ButtonComponent;
