import * as React from "react";
import BaseLink from "next/link";
import * as DS from "@nypl/design-system-react-components";

// allow this component to accept all properties of "a" tag
interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: any;
  linkType?: DS.LinkTypes;
}

const Link = React.forwardRef(
  ({ children, to, linkType, onClick, ...props }: IProps, ref: any) => {
    return (
      <BaseLink href={to} passHref>
        <DS.Link
          type={linkType}
          attributes={{ ref: ref, onClick: onClick, ...props }}
        >
          {children}
        </DS.Link>
      </BaseLink>
    );
  }
);

Link.displayName = "Link";

export default Link;
