import React from 'react';
import { PropTypes } from 'prop-types';
import Button from 'react-bootstrap/Button';
import style from './index.module.scss';

/*
    To use this component, pass the following props:
    
    > buttonLabel : Pass a string value for the button label.
    
    > isLarge : Pass true if you want to have a large button. 
                otherwise it will return default button.

    > isSmall : Pass true if you want to have a small button. 
                otherwise it will return default button.
    
    > isSmall : Pass true if you want to have a outline button. 
                otherwise it will return default button.
*/

const buttonComponets = ({
  buttonLabel,
  isLarge = false, 
  isSmall = false,
  disabled,
  outline = false

}) => {

  return (
    <div>
      {outline === true ? (
        <div>
          {isLarge || isSmall === true ? (
            <Button 
              className={
                isLarge ? style.largeButtonOutlineStyle : style.largeButtonOutlineStyle ||
                isSmall ? style.smallButtonOutlineStyle : style.smallButtonOutlineStyle
              }
              disabled = {disabled}
            >
              {buttonLabel}
            </Button>
          ):(
            <Button className={style.defaultButtonOutlineStyle} disabled = {disabled}>
              {buttonLabel}
            </Button>)}
        </div>
      ) : (
        <div>
          {isLarge || isSmall === true ? (
            <Button 
              className={
                isLarge ? style.largeButtonStyle : style.largeButtonStyle ||
                isSmall ? style.smallButtonStyle : style.smallButtonStyle
              }
              disabled = {disabled}
            >
              {buttonLabel}
            </Button>
          ):(
            <Button className={style.defaultButtonStyle} disabled = {disabled}>
              {buttonLabel}
            </Button>)}
        </div>
      )}
    </div>
  );
};

buttonComponets.propTypes = {
  buttonLabel: PropTypes.string,
  isLarge: PropTypes.bool,
  isSmall: PropTypes.bool,
  disabled: PropTypes.bool,
  outline: PropTypes.bool
};

export default buttonComponets;
