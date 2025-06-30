import React from 'react';

function ButtonActions({ onClickHandler, iconButton, title, className= '' }) {
  return (
    <button
      onClick={onClickHandler}
      className={className}
    >
      {iconButton}
      <span>{title}</span>
    </button>
  );
}

export default ButtonActions;