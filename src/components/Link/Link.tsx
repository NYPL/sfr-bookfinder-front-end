import * as React from 'react';
import BaseLink from 'next/link';

// allow this component to accept all properties of "a" tag
interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: any;
}

const Link =  React.forwardRef(({ to, ...props }: IProps, ref: any) => {
  return (
    <BaseLink href={to}>
      <a {...props} ref={ref} />
    </BaseLink>
  );
});

export default Link;
