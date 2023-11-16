import * as React from "react";
import BaseLink from "next/link";
import * as DS from "@nypl/design-system-react-components";

// allow this component to accept all properties of "a" tag
interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: any;
  modifiers?: string[];
  linkType?: DS.LinkTypes;
  isUnderlined?: boolean;
}

const Link = ({ children, to, linkType, isUnderlined }: IProps) => {
  return (
    <BaseLink href={to} passHref legacyBehavior>
      <DS.Link
        isUnderlined={isUnderlined}
        type={linkType}
        __css={{ width: "100%" }}
      >
        {children}
      </DS.Link>
    </BaseLink>
  );
};

Link.displayName = "Link";

export default Link;
