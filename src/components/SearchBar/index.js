import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BiSearch } from 'react-icons/bi';

import style from './index.module.scss';

/*
    To use this component, pass these props:

    > placeholder  : Pass a string value for the placeholder
 
    > search       : Pass the search value

    > setSearch    : To set the search value
*/

const SearchBar = ({ placeholder, search, setSearch }) => {
  const [searchValue, setSearchValue] = useState(search);

  const onSearchSubmit = (e) => {
    e.preventDefault();

    setSearch(searchValue);
  };

  const onSearchValueChange = (e) => {
    setSearchValue(e.target.value);

    if (e.target.value.length === 0) {
      setSearch('');
    }
  };

  return (
    <Form className={style.searchSection} onSubmit={onSearchSubmit}>
      <div className={style.searchInput}>
        <Form.Control
          className={style.searchBar}
          type="text"
          value={searchValue}
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
  placeholder: PropTypes.string,
  search: PropTypes.string,
  setSearch: PropTypes.func
};

export default SearchBar;
