import React from 'react';

const EditButton = ({ onClick }) => {
  return (
    <div>
    <button onClick={onClick}>
      Edit
    </button>
    </div>
  );
};

export default EditButton;
