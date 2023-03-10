import React from 'react';

function Loading() {
  return (
    <div className="loading-main">
      <div className="loading">
        <div className="lds-circle">
          <div />
        </div>
        <h4 className="loading-text">Loading</h4>
        <div className="loading-msg" />
      </div>
    </div>
  );
}

export default Loading;
