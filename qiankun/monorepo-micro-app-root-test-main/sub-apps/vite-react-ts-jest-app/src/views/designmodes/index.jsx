import React, { useState, useEffect, useCallback, useRef } from "react";
import { renderRoutes, matchRoutes } from "react-router-config";
import { useImmer } from "use-immer";
import { Breadcrumb } from "antd";

export default function DesignModes(props) {
  const { route, match, location } = props;
  
  return (
    <>
      <div className="page-tip-bar">
        <Breadcrumb>
          <Breadcrumb.Item>设计模式案例</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <>{renderRoutes(route.routes, match)}</>
    </>
  );
}
