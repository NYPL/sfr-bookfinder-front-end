import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../../stores/Store';
import BookSvg from '../Svgs/BookSvg';
import { loading as loadingAction, error as errorMsgAction } from '../../actions/SearchActions';

const { dispatch } = store; // dispatch is not found imported directly from store

// intercepts all http request to update the status of loading in the Store
axios.interceptors.request.use(
  (config) => {
    dispatch(errorMsgAction(null));
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
    dispatch(errorMsgAction(error.message));
    setTimeout(() => {
      dispatch(loadingAction(false));
    }, 5000);
    return Promise.reject(error);
  },
);

const Loading = ({ loading, errorMsg }) => (
  <div
    className="loading"
    role="alert"
    aria-live="assertive"
  >
    {loading && !errorMsg && (
      <div className="loading-place">
        <div className="loading-front">
          <BookSvg fill="#0071ce" />
        </div>
        <div className="curtain">
          <div className="loading-back">
            <BookSvg />
          </div>
        </div>
        <div className="label">{loading && !errorMsg ? 'Loading' : 'Content Loaded'}</div>
      </div>
    )}
    {loading && errorMsg && (
      <div
        className="usa-alert usa-alert--error loading-place"
        role="alert"
      >
        <div className="usa-alert__body">
          <h3 className="usa-alert__heading">Error</h3>
          <p className="usa-alert__text">{errorMsg}</p>
        </div>
      </div>
    )}

    <p className="visuallyhidden">
      {loading && !errorMsg ? 'Loading' : 'Content Loaded'}
      {loading && errorMsg}
    </p>
  </div>
);

Loading.propTypes = {
  loading: PropTypes.bool,
  errorMsg: PropTypes.string,
};

Loading.defaultProps = {
  loading: false,
  errorMsg: '',
};

const mapStateToProps = state => ({ loading: state.loading, errorMsg: state.errorMsg });

export default connect(mapStateToProps)(Loading);
