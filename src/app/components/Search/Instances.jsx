import React from 'react';
import PropTypes from 'prop-types';

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
      <ul className="nypl-instances-list">
        {
          items.map((element, key) => (
            <li className="nypl-results-item">
              <div className="nypl-results-description">
                <p tabIndex={key.toString()} key={key.toString()}>
                  {
                    element.ebooks.map((ebook, ebookKey) => (
                      <div key={ebookKey.toString()}>
                        <span className="nypl-results-media">
                          eBook: <a href={ebook.url}> {ebook.url}</a>
                        </span>
                      </div>
                    ))
                  }
                  <span className="nypl-results-date">{element.pub_date}</span>
                  <span className="nypl-results-place">{element.pub_place}</span>
                  <span className="nypl-results-publisher">{element.publisher}</span>
                  <span className="nypl-results-info">{element.language}</span>
                </p>
              </div>
            </li>
          ))
        }
      </ul>
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
