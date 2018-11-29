import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class Instances extends React.Component {
  constructor(props) {
    super(props);

    this.instances = props;
  }

  parseInstances(instances) {
    const items = instances.instances.map((instance, key) => (
      {
        ebooks: (instance.items) ? instance.items : [],
        pub_date: (instance.pub_date) ? parseInt(instance.pub_date) : null,
        pub_place: (instance.pub_place) ? instance.pub_place : null,
        publisher: (instance.publisher) ? instance.pub_publisher : null,
        language: (instance.language) ? instance.language : null
      }
    ));

    return items;
  };

  render() {
    const items = this.parseInstances(this.instances);

    return (
      <div className="instances">
        <h4>Item Details</h4>
        {
          items.map((element, key) => (
            <p tabIndex={key.toString()} key={key.toString()}>
              <ol>
                {
                  element.ebooks.map((ebook, ebookKey) => (
                    <li className="ebook" key={ebookKey.toString()}>
                      <strong>eBook Link</strong> <a href={ebook.url}> {ebook.url}</a>
                    </li>
                  ))
                }
              </ol>
              <span className="publication-date"><strong>Publication Date</strong> {element.pub_date}</span><br />
              <span className="publication-place"><strong>Publication Place</strong> {element.pub_place}</span><br />
              <span className="publisher"><strong>Publisher</strong> {element.publisher}</span><br />
              <span className="language"><strong>Language</strong> {element.language}</span><br />
            </p>
          ))
        }
      </div>
    );
  }
}

Instances.defaultProps = {
  instances: {},
};

Instances.propTypes = {
  instances: PropTypes.array,
};

export default Instances;
