/* eslint-disable max-len */
import React from "react";

type OwnProps = {
  className?: string;
  fill?: string;
};

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof BookSvg.defaultProps;

// @ts-expect-error ts-migrate(7022) FIXME: 'BookSvg' implicitly has type 'any' because it doe... Remove this comment to see the full error message
const BookSvg = ({ fill = "black", className }: Props) => (
  <svg
    width="99"
    height="118"
    viewBox="0 0 99 118"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element[]; width: string; height... Remove this comment to see the full error message
    alt=""
    role="img"
    aria-labelledby="BookIcon"
  >
    <title id="BookIcon">Book Icon</title>

    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.00134 0C1.7922 0 0.00134209 1.79086 0.00134209 4L0.00134206 4.5V5.25768C-4.04591e-06 5.70145 -0.000842233 6.15261 0.00134206 6.60969V97.8085L0.001333 97.9473C0.00102211 101.205 0.000559574 106.048 1.50075 110.1C2.27792 112.199 3.49689 114.206 5.42614 115.684C7.16215 117.013 9.34225 117.812 12.0013 117.971V118H12.9849L13.0013 118L14.0013 118H94.0013C96.2105 118 98.0013 116.209 98.0013 114V28C98.0013 25.7909 96.2105 24 94.0013 24H14.4025C8.83448 21.6299 6.36934 18.5867 5.18239 15.4031C4.00521 12.2456 3.99691 8.78298 4.00319 5H89.5013C90.882 5 92.0013 3.88071 92.0013 2.5C92.0013 1.11929 90.882 0 89.5013 0H4.00134ZM4.00134 97.8085V21.3614C5.80917 23.6337 8.38409 25.6498 12.0013 27.3113V113.961C10.1549 113.814 8.83467 113.256 7.8578 112.508C6.69329 111.616 5.84977 110.326 5.25194 108.711C4.02357 105.393 4.00134 101.221 4.00134 97.8085ZM16.0013 114V28H94.0013V114H16.0013ZM10.0013 9C8.89677 9 8.00134 9.89543 8.00134 11C8.00134 12.1046 8.89677 13 10.0013 13H92.0013C93.1059 13 94.0013 12.1046 94.0013 11C94.0013 9.89543 93.1059 9 92.0013 9H10.0013ZM13.0013 18C13.0013 16.8954 13.8968 16 15.0013 16H94.0013C95.1059 16 96.0013 16.8954 96.0013 18C96.0013 19.1046 95.1059 20 94.0013 20H15.0013C13.8968 20 13.0013 19.1046 13.0013 18Z"
      fill={fill}
    />
  </svg>
);

BookSvg.defaultProps = {
  className: "",
  fill: "black",
};

export default BookSvg;
