import React from 'react';
import { renderDropdown } from './components/dropdown';
import ButtonComponets from '../../../components/Button';

const ThemePage = () => {
  return (
    <div className="container mt-5 d-flex-column gap-5">{renderDropdown()}

      <div className="mt-5" >
        <h3 className="mt-10">
          <u>Buttons</u>
        </h3>
        <div  className="d-flex gap-5">
          <div>
            <div className="mt-5">
              <ButtonComponets buttonLabel="Large Button" isLarge={true}/>
            </div>
            <div className="mt-3">
              <ButtonComponets buttonLabel="Default Button" />
            </div>
            <div className="mt-3">
              <ButtonComponets buttonLabel="Small Btn" isSmall={true} />
            </div>  

            <div className="mt-5">
              <ButtonComponets buttonLabel="Outline" isLarge={true} outline = {true}/>
            </div>
            <div className="mt-3">
              <ButtonComponets buttonLabel="Outline" outline = {true}/>
            </div>
            <div className="mt-3">
              <ButtonComponets buttonLabel="Outline" isSmall={true} outline = {true} />
            </div>  
          </div>
          <div>
            <div className="mt-5">
              <ButtonComponets buttonLabel="Disabled" isLarge={true} disabled/>
            </div>
            <div className="mt-3">
              <ButtonComponets buttonLabel="Disabled" disabled/>
            </div>
            <div className="mt-3">
              <ButtonComponets buttonLabel="Disabled" isSmall={true} disabled />
            </div>  

            <div className="mt-5">
              <ButtonComponets buttonLabel="Disabled" isLarge={true} outline = {true} disabled/>
            </div>
            <div className="mt-3">
              <ButtonComponets buttonLabel="Disabled" outline = {true} disabled/>
            </div>
            <div className="mt-3">
              <ButtonComponets buttonLabel="Disabled" isSmall={true} outline = {true} disabled/>
            </div>  
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default ThemePage;
