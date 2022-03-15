import React from 'react';

import InputField from '../../../../components/InputField';

export const renderInput = () => {

  return (
    <div 
      style={{
        marginTop: '20px',
      }}>
      <h3 className="mb-4">
        <u>Input</u>
      </h3>
      <div className="d-flex gap-5">
        <div>
          <div 
            style={{
              marginBottom: '20px',
            }}>
            <InputField
              fieldSize="lg"
              placeholder="Large Input"
              type="email"
            />
          </div>
          <div
            className="d-flex gap-5"
            style={{
              marginBottom: '20px',
            }}
          >
            <InputField
              fieldSize="md"
              placeholder="Default Input"
            />
            <InputField
              fieldSize="md"
              placeholder="Invalid Field"
              isInvalid={true}
            />
            <InputField
              fieldSize="md"
              placeholder="Search"
            />
          </div>
          <div 
            style={{
              marginBottom: '20px',
            }}>
            <InputField
              fieldSize="sm"
              placeholder="Small Input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
