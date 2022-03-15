import React from 'react';

import Button from '../../../../components/Button';

export const renderButton = () => {

  return (
    <div>
      <div className="mt-5" >
        <h3 className="mt-10">
          <u>Buttons</u>
        </h3>
        <div  className="d-flex gap-4">
          <div>
            <div className="mt-5">
              <Button buttonLabel="Large Button" buttonSize="lg"/>
            </div>
            <div className="mt-3">
              <Button buttonLabel="Default Button" buttonSize="def"/>
            </div>
            <div className="mt-3">
              <Button buttonLabel="Small Btn" buttonSize="sm"/>
            </div>  

            <div className="mt-5">
              <Button buttonLabel="Outline" buttonSize="lg" outline = {true}/>
            </div>
            <div className="mt-3">
              <Button buttonLabel="Outline" buttonSize="def" outline = {true}/>
            </div>
            <div className="mt-3">
              <Button buttonLabel="Outline" buttonSize="sm" outline = {true} />
            </div>  
          </div>
          <div>
            <div className="mt-5">
              <Button buttonLabel="Disabled" buttonSize="lg" disabled/>
            </div>
            <div className="mt-3">
              <Button buttonLabel="Disabled" buttonSize="def" disabled/>
            </div>
            <div className="mt-3">
              <Button buttonLabel="Disabled" buttonSize="sm" disabled />
            </div>  

            <div className="mt-5">
              <Button buttonLabel="Disabled" buttonSize="lg" outline = {true} disabled/>
            </div>
            <div className="mt-3">
              <Button buttonLabel="Disabled" buttonSize="def" outline = {true} disabled/>
            </div>
            <div className="mt-3">
              <Button buttonLabel="Disabled" buttonSize="sm" outline = {true} disabled/>
            </div>  
          </div>
        </div>

      </div>
    </div>
  );
};
