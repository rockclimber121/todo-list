import * as React from "react";
import { Route, Switch, RouteComponentProps, withRouter } from "react-router-dom";
import AlertDialog from "./components/common/AlertDialog/AlertDialogContainer";
import HomePage from "./components/pages/HomePage";
import { Locale } from "./redux/modules/application/types";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import NotFoundPage from "./components/pages/NotFoundPage";
import AboutPage from "./components/pages/AboutPage";
import { links } from "./redux/constants";
type OwnProps = {
    locale?: Locale;
};

const styles = () =>
    createStyles({
        root: {
            overflow: "hidden",
            height: "100vh",
        },
    });

type Props = RouteComponentProps<OwnProps> & OwnProps & WithStyles<typeof styles>;

class App extends React.PureComponent<Props> {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AlertDialog />
                {this._renderRouter()}
            </div>
        );
    }

    private _renderRouter = () => {
        return (
            <Switch>
                <Route exact={true} path={links.home} component={HomePage} />
                <Route path={links.about} component={AboutPage} />
                <Route path="*" component={NotFoundPage} />
            </Switch>
        );
    };
}

export default withRouter(withStyles(styles)(App));
