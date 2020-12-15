import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../../stores/Store';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Svgs/BookSvg' was resolved to '/Users/c... Remove this comment to see the full error message
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

type OwnLoadingProps = {
    loading?: boolean;
    errorMsg?: string;
};

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'LoadingProps' circularly references it... Remove this comment to see the full error message
type LoadingProps = OwnLoadingProps & typeof Loading.defaultProps;

// @ts-expect-error ts-migrate(7022) FIXME: 'Loading' implicitly has type 'any' because it doe... Remove this comment to see the full error message
const Loading = ({ loading, errorMsg }: LoadingProps) => (
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <div
    className="loading"
    role="alert"
    aria-live="assertive"
  >
    {loading && !errorMsg && (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="loading-place">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="loading-front">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <BookSvg fill="#0071ce" />
        </div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="curtain">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="loading-back">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <BookSvg />
          </div>
        </div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="label">{loading && !errorMsg ? 'Loading' : 'Content Loaded'}</div>
      </div>
    )}
    {loading && errorMsg && (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div
        className="usa-alert usa-alert--error loading-place"
        role="alert"
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="usa-alert__body">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <h3 className="usa-alert__heading">Error</h3>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className="usa-alert__text">{errorMsg}</p>
        </div>
      </div>
    )}

    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <p className="visuallyhidden">
      {loading && !errorMsg ? 'Loading' : 'Content Loaded'}
      {loading && errorMsg}
    </p>
  </div>
);

Loading.defaultProps = {
  loading: false,
  errorMsg: '',
};

const mapStateToProps = (state: any) => ({
  loading: state.loading,
  errorMsg: state.errorMsg
});

export default connect(mapStateToProps)(Loading);
