import React from 'react';

const SeeObj = ({ usersLogInfo, handleClose }) => {
  const { log } = usersLogInfo;
  return (
    <div>
      <h1>{log}</h1>
      <button onClick={handleClose}>close</button>
    </div>
  );
};

export default SeeObj;
