import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import style from './index.module.scss';

/*
    To use this component, pass the following props:
    
    > dropdownLabel : Pass a string value for the dropdown label.
    
    > dropdownItems : Pass an array of objects containing the name of the dropdown items

                       e.g.  const items = [{name: 'Web Development'}, {name: 'Science'}];
    
    > isScrollable : Pass true if there are a lot of menu items to make the dropdown menu scrollable, 
                     otherwise pass false and the dropdown menu height will adjust according to how many items there are.

    > fillter      : Pass the filter value
    
    > setFilter    : Pass your setter function to set the filter value.
*/

const FilterDropdown = ({
  dropdownLabel,
  dropdownItems,
  isScrollable,
  filter,
  setFilter
}) => {
  const [activeItem, setActiveItem] = useState(filter || 'All');
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Dropdown
      onClick={() => {
        if (dropdownItems?.length > 0) {
          setIsClicked(!isClicked);
        }
      }}
    >
      <Dropdown.Toggle className={style.dropdownButton} bsPrefix="none">
        {filter || dropdownLabel}
        {isClicked ? <IoIosArrowUp size={17} /> : <IoIosArrowDown size={17} />}
      </Dropdown.Toggle>
      {dropdownItems?.length ? (
        <Dropdown.Menu
          className={
            isScrollable ? style.dropdownMenuScrollable : style.dropdownMenu
          }
        >
          <Dropdown.Item
            className={
              activeItem === 'All' ? style.activeItem : style.dropdownItems
            }
            onClick={() => {
              setActiveItem(-1);
              setFilter('');
            }}
          >
            All
          </Dropdown.Item>
          {dropdownItems?.map((item, idx) => {
            return (
              <Dropdown.Item
                key={idx}
                className={
                  activeItem === item.name
                    ? style.activeItem
                    : style.dropdownItems
                }
                onClick={() => {
                  setActiveItem(item.name);
                  setFilter(item.name);
                  setIsClicked(false);
                }}
              >
                {item.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      ) : (
        ''
      )}
    </Dropdown>
  );
};

FilterDropdown.propTypes = {
  dropdownLabel: PropTypes.string,
  dropdownItems: PropTypes.array,
  isScrollable: PropTypes.bool,
  filter: PropTypes.string,
  setFilter: PropTypes.func
};

export default FilterDropdown;
