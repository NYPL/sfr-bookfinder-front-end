import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../../stores/Store';
import BookSvg from '../Svgs/BookSvg';
import { loading as loadingAction } from '../../actions/SearchActions';

const { dispatch } = store; // dispatch is not found imported directly from store

// intercepts all http request to update the status of loading in the Store
axios.interceptors.request.use(
  (config) => {
    dispatch(loadingAction(true));
    return config;
  },
  (error) => {
    dispatch(loadingAction(false));
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    dispatch(loadingAction(false));
    return response;
  },
  (error) => {
    dispatch(loadingAction(false));
    return Promise.reject(error);
  },
);

const Loading = ({ loading }) => (
  <div
    className="loading"
    role="alert"
    aria-live="assertive"
  >
    {loading && (
      <div className="loading-place">
        <div className="loading-front">
          <BookSvg fill="#0071ce" />
        </div>
        <div className="curtain">
          <div className="loading-back">
            <BookSvg />
          </div>
        </div>
        <div className="label">{loading ? 'Loading' : 'Content Loaded'}</div>
      </div>
    )}
    <p className="visuallyhidden">{loading ? 'Loading' : 'Content Loaded'}</p>
  </div>
);

Loading.propTypes = {
  loading: PropTypes.bool,
};

Loading.defaultProps = {
  loading: false,
};

const mapStateToProps = state => ({ loading: state.loading });

export default connect(mapStateToProps)(Loading);
