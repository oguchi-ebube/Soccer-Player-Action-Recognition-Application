import * as React from "react";
import { Route, Switch } from "react-router-dom";
import utils from "../../utils/utils";
import "./index.css";

class Router extends React.Component {
  render() {
    const AppLayout = utils.getRoute("/").component;

    return (
      <Switch>
        <Route
          path="/"
          render={(props) => <AppLayout {...props} />}
          params={this.props.params}
        />
      </Switch>
    );
  }
}

export default Router;
