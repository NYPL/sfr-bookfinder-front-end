import React from 'react';
import {
  isEmpty as _isEmpty,
} from 'underscore';

export const Instances = (instances) => {
  if (_isEmpty(instances.instances)) {
    return null;
  }

  const items = instances.instances.map((instance, key) => (
    {
      ebooks: (instance.items) ? instance.items : [],
      pub_date: (instance.pub_date) ? parseInt(instance.pub_date) : null,
      pub_place: (instance.pub_place) ? instance.pub_place : null,
      publisher: (instance.publisher) ? instance.pub_publisher : null,
      language: (instance.language) ? instance.language : null
    }
  ));

  return (
    <ul className="nypl-instances-list">
      {
        items.map((element, key) => (
          <li className="nypl-results-item" key={key.toString()}>
            <div className="nypl-results-description">
              <p key={key.toString()}>
                {
                  element.ebooks.map((ebook, ebookKey) => (
                    <span key={ebookKey.toString()}>
                      <span className="nypl-results-media">
                        eBook: <a href={ebook.url}> {ebook.url}</a>
                      </span>
                    </span>
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
};

export default Instances;
