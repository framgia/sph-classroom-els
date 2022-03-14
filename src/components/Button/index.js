import React from 'react';
import { PropTypes } from 'prop-types';
import Button from 'react-bootstrap/Button';
import style from './index.module.scss';

/*
    To use this component, pass the following props:
    
    > dropdownLabel : Pass a string value for the dropdown label.
    
    > dropdownItems : Pass an array of objects containing the name of the dropdown items

                       e.g.  const items = [{name: 'Web Development'}, {name: 'Science'}];
    
    > isScrollable : Pass true if there are a lot of menu items to make the dropdown menu scrollable, 
                     otherwise you don't have to pass this prop and the dropdown menu height will adjust according to how many items there are.

    > fillter      : Pass the filter value
    
    > setFilter    : Pass your setter function to set the filter value.
*/

const buttonComponets = () => {
    
  return (
    <div>
      <Button className={style.largeButtonStyle} />
      <Button className={style.defaultButtonStyle} />
      <Button className={style.smallButtonStyle} />
      <Button className={style.largeButtonDisableStyle} />
      <Button className={style.defaultButtonDisableStyle} />
      <Button className={style.smallButtonDisableStyle} />
      <Button className={style.largeButtonOutlineStyle} />
      <Button className={style.defaultButtonOutlineStyle} />
      <Button className={style.smallButtonOutlineStyle} />
      <Button className={style.largeButtonOutlineDisableStyle} />
      <Button className={style.defaultButtonOutlineDisableStyle} />
      <Button className={style.smallButtonOutlineDisableStyle} />
    </div>
  );
};

buttonComponets.propTypes = {
  largeButton: PropTypes.func,
  defaultButton: PropTypes.func,
  smallButton: PropTypes.func
};

export default buttonComponets;
