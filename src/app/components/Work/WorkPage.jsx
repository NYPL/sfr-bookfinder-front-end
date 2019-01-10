import React from 'react';
import { Link } from 'react-router';

const WorkPage = (item) => {
  return (
    <div className="nypl-row">
      <div className="nypl-column-full">
        <div id="work-detail">
          <dl>
            {item.map((element, key) => {
              <dd>{key}: {element}</dd>
            })}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default WorkPage;
