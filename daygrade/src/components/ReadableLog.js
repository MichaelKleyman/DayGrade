import React from 'react';
import { AiFillDelete } from 'react-icons/ai';

const ReadableLog = ({ usersLogInfo, handleDelete, handleEdit }) => {
  return (
    <div
      key={usersLogInfo.id}
      className='bg-gradient-to-r from-cyan-200 to-blue-400 shadow-lg shadow-gray-400 rounded-xl'
    >
      <h1 className='font-bold mx-4 my-3 py-4 flex justify-between'>
        {usersLogInfo.log}
        <div className='grid grid-cols-2 gap-2'>
          {/* <button
            onClick={() => {
              console.log('This is: ', usersLogInfo);
              //   setEditedLog(usersLogInfo.log)
              handleClickOpen();
            }}
          >
            Click
          </button> */}
          {/* <EditLog
                    open={open}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    usersLogInfo={usersLogInfo.log}
                    logId={usersLogInfo.id}
                    handleEdit={handleEdit}
                    editedLog={editedLog}
                    setEditedLog={setEditedLog}
                    submitEdit={submitEdit}
                  /> */}
          <AiFillDelete
            onClick={() => handleDelete(usersLogInfo.id)}
            size={25}
            className='duration-300 hover:scale-110 hover:text-white cursor-pointer'
          />
        </div>
      </h1>
      {/* <EditLog
              open={open}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              usersLogInfo={usersLogInfo.log}
              logId={usersLogInfo.id}
              handleEdit={handleEdit}
              editedLog={editedLog}
              setEditedLog={setEditedLog}
              submitEdit={submitEdit}
            /> */}
      <h1 className='mx-4 py-2 text-sm text-gray-600'>{usersLogInfo.Time}</h1>
      <button onClick={(e) => handleEdit(e, usersLogInfo.id)}>Edit</button>
    </div>
  );
};

export default ReadableLog;
