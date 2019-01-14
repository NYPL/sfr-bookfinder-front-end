import React from 'react';
import { Link } from 'react-router';

class WorkPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  render() {
    console.log('Work page state:', this.state);
    if (!this.state.item) {
      return null;
    } else {
      return (
        <div className="nypl-row">
          <div className="nypl-column-full">
            <div id="work-detail">
              <dl>
                {this.state.item.map((element, key) => {
                  <dd>{key}: {element}</dd>
                })}
              </dl>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default WorkPage;
