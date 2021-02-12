import * as React from "react";
import BaseLink from "next/link";
import * as DS from "@nypl/design-system-react-components";

// allow this component to accept all properties of "a" tag
interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: any;
}

const Link = React.forwardRef(
  ({ children, to, ...props }: IProps, ref: any) => {
    return (
      <BaseLink href={to} passHref>
        <DS.Link attributes={{ ref: ref, ...props }}>{children}</DS.Link>
      </BaseLink>
    );
  }
);

Link.displayName = "Link";

export default Link;
