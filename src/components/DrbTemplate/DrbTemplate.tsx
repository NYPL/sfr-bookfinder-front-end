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

const DrbBreakout: React.FC<{
  children?: React.ReactNode;
  breadcrumbsData?: BreadcrumbsDataProps[];
}> = ({ children, breadcrumbsData }) => {
  return (
    <TemplateBreakout>
      <DrbBreadcrumbs breadcrumbsData={breadcrumbsData} />
      {children}
    </TemplateBreakout>
  );
};

const DrbBreadcrumbs: React.FC<{ breadcrumbsData: BreadcrumbsDataProps[] }> = (
  props
) => {
  const { breadcrumbsData } = props;

  const breadcrumbsDataAll = breadcrumbsData
    ? [...defaultBreadcrumbs, ...breadcrumbsData]
    : defaultBreadcrumbs;

  return (
    <Breadcrumbs
      breadcrumbsType="research"
      breadcrumbsData={breadcrumbsDataAll}
    />
  );
};

const DrbHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <TemplateHeader>{children}</TemplateHeader>;
};

const DrbContent: React.FC<{
  children: React.ReactNode;
  sidebar?: "left" | "right" | "none";
}> = ({ children, sidebar }) => {
  return <TemplateContent sidebar={sidebar}>{children}</TemplateContent>;
};

const DrbContentTop: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <TemplateContentTop>{children}</TemplateContentTop>;
};

const DrbContentSidebar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <TemplateContentSidebar>{children}</TemplateContentSidebar>;
};

const DrbContentPrimary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <TemplateContentPrimary>{children}</TemplateContentPrimary>;
};

export const DrbTemplate: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Template>{children}</Template>;
};

export {
  DrbBreakout,
  DrbHeader,
  DrbContent,
  DrbContentTop,
  DrbContentSidebar,
  DrbContentPrimary,
};

export default DrbTemplate;
