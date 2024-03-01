import React from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

export default function HeadTop(props: any, context?: any): React.ReactElement<any, any> {
  const { propCollapsed, onToggleMenu } = props;

  return (
    <>
      {React.createElement(propCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => onToggleMenu(!propCollapsed),
      })}
    </>
  );
}
