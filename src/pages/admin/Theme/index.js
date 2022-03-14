import React from 'react';
import { renderDropdown } from './components/dropdown';
import ButtonComponets from '../../../components/Button';

const ThemePage = () => {
  return (
    <div className="container mt-5 d-flex-column gap-5">{renderDropdown()}
      <ButtonComponets className="mt-200"/>
    </div>
  );
};

export default ThemePage;
