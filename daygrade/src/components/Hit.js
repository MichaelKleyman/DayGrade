import React from 'react';

const Hit = ({ hit }) => {
  return (
    <div>
      <header>
        <div>{hit.log}</div>
      </header>
      <div>{hit.Date}</div>
    </div>
  );
};

export default Hit;
