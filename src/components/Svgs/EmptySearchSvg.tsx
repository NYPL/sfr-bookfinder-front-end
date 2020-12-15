/* eslint-disable max-len */
import React from 'react';

type OwnProps = {
    className?: string;
};

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof EmptySearchSvg.defaultProps;

// @ts-expect-error ts-migrate(7022) FIXME: 'EmptySearchSvg' implicitly has type 'any' because... Remove this comment to see the full error message
const EmptySearchSvg = ({ className }: Props) => (
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <svg
    width="99"
    height="118"
    viewBox="0 0 99 118"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-labelledby="SearchBookIcon"
  >
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <title id="SearchBookIcon">No Search Results Icon</title>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.00134 0C1.7922 0 0.00134192 1.79086 0.00134192 4L0.0013419 4.5V5.25768C-3.71157e-06 5.70145 -0.000842396 6.15261 0.0013419 6.60969V97.8085L0.00133284 97.9473C0.00102194 101.205 0.00055941 106.048 1.50075 110.1C2.27792 112.199 3.49689 114.206 5.42614 115.684C7.16215 117.013 9.34224 117.812 12.0013 117.971V118H12.9849L13.0013 118L14.0013 118H94.0014C96.2105 118 98.0014 116.209 98.0014 114V28C98.0014 25.7909 96.2105 24 94.0014 24H74.6863C75.7447 25.2522 76.7056 26.5894 77.5572 28H94.0014V114H16.0013V28H24.4428C25.2944 26.5894 26.2553 25.2522 27.3137 24H14.4025C8.83447 21.6299 6.36934 18.5867 5.18239 15.4031C4.00521 12.2456 3.99691 8.78298 4.00319 5H89.5014C90.8821 5 92.0014 3.88071 92.0014 2.5C92.0014 1.11929 90.8821 0 89.5014 0H4.00134ZM94.0014 20H70.6229C68.7011 18.4268 66.5869 17.0799 64.321 16H94.0014C95.1059 16 96.0014 16.8954 96.0014 18C96.0014 19.1046 95.1059 20 94.0014 20ZM31.3771 20C33.2989 18.4268 35.4131 17.0799 37.679 16H15.0013C13.8968 16 13.0013 16.8954 13.0013 18C13.0013 19.1046 13.8968 20 15.0013 20H31.3771ZM92.0014 13H51H10.0013C8.89677 13 8.00134 12.1046 8.00134 11C8.00134 9.89543 8.89677 9 10.0013 9H92.0014C93.1059 9 94.0014 9.89543 94.0014 11C94.0014 12.1046 93.1059 13 92.0014 13ZM4.00134 97.8085V21.3614C5.80917 23.6337 8.38409 25.6498 12.0013 27.3113V113.961C10.1549 113.814 8.83467 113.256 7.8578 112.508C6.69329 111.616 5.84977 110.326 5.25194 108.711C4.02357 105.393 4.00134 101.221 4.00134 97.8085ZM51 66.9613C63.7053 66.9613 74 56.6698 74 43.9806C74 31.2915 63.7053 21 51 21C38.2947 21 28 31.2915 28 43.9806C28 56.6698 38.2947 66.9613 51 66.9613ZM51 70.9613C54.7155 70.9613 58.2557 70.2113 61.4773 68.8546L79.1285 99.4274C79.6808 100.384 80.9043 100.712 81.8613 100.161C82.8182 99.6091 83.1463 98.3865 82.594 97.4299L65.0424 67.0297C72.8127 62.2924 78 53.7419 78 43.9806C78 29.0796 65.9117 17 51 17C36.0883 17 24 29.0796 24 43.9806C24 58.8816 36.0883 70.9613 51 70.9613Z"
      fill="black"
    />
  </svg>
);

EmptySearchSvg.defaultProps = {
  className: '',
};

export default EmptySearchSvg;
