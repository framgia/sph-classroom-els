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

const ButtonComponets = ({
  buttonLabel,
  buttonSize,
  disabled,
  outline = false

}) => {

  function onButtonSize() {

    switch(buttonSize) {
    case 'lg':
      return style.largeButtonStyle;
    case 'def':
      return style.defaultButtonStyle;
    case 'sm':
      return style.smallButtonStyle;
    }
  }

  function onOutlineButtonSize() {

    switch(buttonSize) {
    case 'lg':
      return style.largeButtonOutlineStyle;
    case 'def':
      return style.defaultButtonOutlineStyle;
    case 'sm':
      return style.smallButtonOutlineStyle;
    }
  }


  return (
    <div>
      {outline === true ? ( 
        <Button className={onOutlineButtonSize()} disabled = {disabled} >
          {buttonLabel}
        </Button>
      ):( 
        <Button className={onButtonSize()} disabled = {disabled} >
          {buttonLabel}
        </Button>)}
    </div>
  );
};

ButtonComponets.propTypes = {
  buttonLabel: PropTypes.string,
  buttonSize: PropTypes.string,
  disabled: PropTypes.bool,
  outline: PropTypes.bool
};

export default ButtonComponets;
