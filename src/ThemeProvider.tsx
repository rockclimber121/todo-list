import { connect } from "react-redux";
import * as React from "react";
import { StoreState } from "./redux/types";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeType } from "./redux/modules/application/types";
import darkTheme from "./theme/theme.dark";
import standartTheme from "./theme/theme.standart";
import skyTheme from "./theme/theme.sky";
import { loadThemeAction } from "./redux/modules/application/actions";

const mapStateToProps = (state: StoreState) => {
    return {
        themeType: state.application.themeType,
    };
};

const dispatchToProps = {
    loadTheme: loadThemeAction,
};

const themes = {
    [ThemeType.Dark]: darkTheme,
    [ThemeType.Standart]: standartTheme,
    [ThemeType.Sky]: skyTheme,
};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps;

class ThemeProvider extends React.PureComponent<Props> {
    componentDidMount() {
        this.props.loadTheme();
    }

    render() {
        const { themeType, children } = this.props;
        return <MuiThemeProvider theme={themes[themeType || ThemeType.Standart]}>{children}</MuiThemeProvider>;
    }
}

export default connect(
    mapStateToProps,
    dispatchToProps,
)(ThemeProvider);
