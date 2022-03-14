import React, { useState } from 'react';

import FilterDropdown from '../../../components/FilterDropdown';

const ThemePage = () => {
  const [scrollableFilter, setScrollableFilter] = useState('');
  const [filter, setFilter] = useState('');
  const dropdownOptions = [
    { name: 'Option 1' },
    { name: 'Option 2' },
    { name: 'Option 3' },
    { name: 'Option 4' },
    { name: 'Option 5' },
    { name: 'Option 6' },
    { name: 'Option 7' },
    { name: 'Option 8' },
    { name: 'Option 9' },
    { name: 'Option 10' }
  ];

  return (
    <div className="container mt-5 d-flex-column gap-5">
      <div>
        <h3 className="mb-4">
          <u>Dropdown Menu</u>
        </h3>
        <div className="d-flex gap-5">
          <FilterDropdown
            dropdownLabel="Scrollable Dropdown"
            dropdownItems={dropdownOptions}
            isScrollable={true}
            filter={scrollableFilter}
            setFilter={setScrollableFilter}
          />
          <FilterDropdown
            dropdownLabel="Fixed Dropdown"
            dropdownItems={dropdownOptions}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default ThemePage;
