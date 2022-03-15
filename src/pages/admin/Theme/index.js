import React from 'react';
import { renderDropdown } from './components/dropdown';
import { renderButton } from './components/button';

const ThemePage = () => {
  return (
    <div className="container mt-5 d-flex-column gap-5">{renderDropdown()}
      <div>{renderButton()}</div>
    </div>
  );
};

export default ThemePage;
