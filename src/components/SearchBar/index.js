import React from 'react';
import { PropTypes } from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BiSearch } from 'react-icons/bi';

import style from './index.module.scss';

/*
    To use this component, pass the following props:
    
    > onSearchSubmit      : Pass a function that will handle the search submit
    
    > onSearchValueChange : Pass a function that will handle everytime the search input value changes

    > placeholder         : Pass a string value for the placeholder
*/

const SearchBar = ({ onSearchSubmit, onSearchValueChange, placeholder }) => {
  return (
    <Form className={style.searchSection} onSubmit={onSearchSubmit}>
      <div className={style.searchInput}>
        <Form.Control
          className={style.searchBar}
          type="text"
          placeholder={placeholder}
          onChange={onSearchValueChange}
        />
        <BiSearch size={17} className={style.searchIcon} />
      </div>
      <Button className={style.searchButton} type="submit">
        Search
      </Button>
    </Form>
  );
};

SearchBar.propTypes = {
  onSearchSubmit: PropTypes.func,
  onSearchValueChange: PropTypes.func,
  placeholder: PropTypes.string
};

export default SearchBar;
