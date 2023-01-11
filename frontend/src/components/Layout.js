import React from 'react';

function Layout(props) {
  return (
    <div style={{ backgroundColor: '#C4D3E9' }}>
      {props.children}
    </div>
  );
}

export default Layout;