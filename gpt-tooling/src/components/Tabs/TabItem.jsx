// TabItem.js
import React from 'react';
import clsx from 'clsx';

const TabItem = ({ children }) => {
  const tabItemStyles = clsx(
    'cursor-pointer'
  )
  return <div className={tabItemStyles}>{children}</div>;
};

export default TabItem;
