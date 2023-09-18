import {
  Breadcrumbs,
  Template,
  TemplateBreakout,
  TemplateContent,
  TemplateContentPrimary,
  TemplateContentSidebar,
  TemplateContentTop,
  TemplateHeader,
} from "@nypl/design-system-react-components";
import { BreadcrumbsDataProps } from "@nypl/design-system-react-components/dist/src/components/Breadcrumbs/Breadcrumbs";
import React from "react";
import { defaultBreadcrumbs } from "~/src/constants/labels";

type DrbTemplateProps = {
  breadcrumbsData?: BreadcrumbsDataProps[];
  contentPrimary?: React.ReactElement;
  contentSidebar?: React.ReactElement;
  contentTop?: React.ReactElement;
  header?: React.ReactElement;
  sidebarSide?: "left" | "right" | "none";
};

export const DrbTemplate: React.FC<DrbTemplateProps> = (props) => {
  const {
    breadcrumbsData,
    contentPrimary,
    contentSidebar,
    contentTop,
    header,
    sidebarSide,
  } = props;

  const breadcrumbsDataAll = breadcrumbsData
    ? [...defaultBreadcrumbs, ...breadcrumbsData]
    : defaultBreadcrumbs;

  return (
    <Template>
      <TemplateBreakout>
        <Breadcrumbs
          breadcrumbsType="research"
          breadcrumbsData={breadcrumbsDataAll}
        />
        {header && <TemplateHeader>{header}</TemplateHeader>}
      </TemplateBreakout>
      <TemplateContent sidebar={sidebarSide}>
        {contentTop && <TemplateContentTop>{contentTop}</TemplateContentTop>}
        {contentSidebar && (
          <TemplateContentSidebar>{contentSidebar}</TemplateContentSidebar>
        )}
        <TemplateContentPrimary>{contentPrimary}</TemplateContentPrimary>
      </TemplateContent>
    </Template>
  );
};

export default DrbTemplate;
