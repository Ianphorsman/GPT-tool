const TabContent = ({ children, isActive }) => {
  return (
    <div style={{ display: isActive ? 'block' : 'none' }}>
      {children}
    </div>
  );
};

export default TabContent
