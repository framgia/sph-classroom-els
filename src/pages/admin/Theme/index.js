import React from 'react';
import { renderDropdown } from './components/dropdown';

const ThemePage = () => {
  return (
    <div className="container mt-5 d-flex-column gap-5">{renderDropdown()}</div>
  );
};

export default ThemePage;
