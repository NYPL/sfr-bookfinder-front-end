import React from "react";

const Error: React.FC<any> = () => {
  return (
    <>
      {loading && errorMsg && (
        <div className="usa-alert usa-alert--error loading-place" role="alert">
          <div className="usa-alert__body">
            <h3 className="usa-alert__heading">Error</h3>

            <p className="usa-alert__text">{errorMsg}</p>
          </div>
        </div>
      )}

      <p className="visuallyhidden">
        {loading && !errorMsg ? "Loading" : "Content Loaded"}
        {loading && errorMsg}
      </p>
    </>
  );
};

export default Error;
