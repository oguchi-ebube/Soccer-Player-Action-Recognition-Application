import React, { useState } from "react";
import { Layout } from "antd";
import "./AppLayout.css";
import { appRouters } from "../Router/router.config";
import { Switch, Redirect, Link, Route } from "react-router-dom";

const { Content } = Layout;

const AppRouter = (props) => {
  return (
    <Layout id="layout-page">
      <Content>
        <Switch>
          {appRouters
            .filter((item) => !item.isLayout)
            .map((item, index) => (
              <Route
                key={index}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ))}
          <Redirect from="/" to="home" />
        </Switch>
      </Content>
    </Layout>
  );
};

export default AppRouter;
