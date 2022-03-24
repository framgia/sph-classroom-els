import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import Cookies from 'js-cookie';

export const AdminContext = createContext();

export function AdminProvider({ children }) {
  const adminName = Cookies.get('admin_name');

  const [name, setName] = useState(adminName);

  return (
    <AdminContext.Provider value={{ name, setName }}>
      {children}
    </AdminContext.Provider>
  );
}

AdminProvider.propTypes = {
  children: PropTypes.any
};
