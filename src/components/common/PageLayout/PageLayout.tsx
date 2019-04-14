import React from "react";
import { createStyles, Theme, WithStyles, withStyles, WithTheme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { changeLocaleAction, changeThemeAction } from "../../../redux/modules/application/actions";
import { StoreState } from "../../../redux/types";
import { Locale, ThemeType } from "../../../redux/modules/application/types";
import messages from "./messages";
import IconButton from "@material-ui/core/IconButton";
import AboutIcon from "./AboutIcon";
import { history } from "../../../redux/init";
import { links } from "../../../redux/constants";
import HomeIcon from "./HomeIcon";
import MenuItem from "@material-ui/core/MenuItem";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.palette.background.default,
            height: "100vh",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: theme.palette.action.disabledBackground,
            opacity: 0.8,
        },
        locale: {
            marginRight: theme.spacing.unit,
            backgroundColor: theme.palette.action.disabledBackground,
        },
        theme: {
            marginRight: theme.spacing.unit,
        },
    });

const dispatchToProps = {
    changeLocale: changeLocaleAction,
    changeTheme: changeThemeAction,
};

const mapStateToProps = (state: StoreState) => {
    return {
        locale: state.application.locale,
        themeType: state.application.themeType,
    };
};

type Props = WithStyles<typeof styles> &
    WithTheme &
    InjectedIntlProps &
    typeof dispatchToProps &
    ReturnType<typeof mapStateToProps>;

class PageLayout extends React.PureComponent<Props> {
    render() {
        const { children, classes, locale, themeType, intl, theme } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <IconButton onClick={this._onHomeClick}>
                        <HomeIcon fillColor={theme.palette.primary.light} />
                    </IconButton>
                    <Select
                        value={locale}
                        className={classes.locale}
                        variant="standard"
                        onChange={this._onLocaleChange}
                    >
                        {this._getLocaleOptions()}
                    </Select>
                    <Select
                        value={themeType}
                        className={classes.theme}
                        variant="standard"
                        onChange={this._onThemeChange}
                    >
                        {this._getThemeOptions()}
                    </Select>
                    <IconButton title={intl.formatMessage(messages.aboutButtonTitle)} onClick={this._onAboutClick}>
                        <AboutIcon fillColor={theme.palette.primary.light} />
                    </IconButton>
                </div>
                {children}
            </div>
        );
    }

    private _onAboutClick = () => {
        history.push(links.about);
    };

    private _onHomeClick = () => {
        history.push(links.home);
    };

    private _getLocaleOptions() {
        const { intl } = this.props;
        return [
            <MenuItem value={Locale.En}>{intl.formatMessage(messages.enLocaleName)}</MenuItem>,
            <MenuItem value={Locale.Ru}>{intl.formatMessage(messages.ruLocaleName)}</MenuItem>,
        ];
    }

    private _onLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.changeLocale(e.target.value as Locale);
    };

    private _getThemeOptions() {
        const { intl } = this.props;
        return [
            <MenuItem value={ThemeType.Standart}>{intl.formatMessage(messages.standartThemeName)}</MenuItem>,
            <MenuItem value={ThemeType.Dark}>{intl.formatMessage(messages.darkThemeName)}</MenuItem>,
            <MenuItem value={ThemeType.Sky}>{intl.formatMessage(messages.skyThemeName)}</MenuItem>,
        ];
    }

    private _onThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.changeTheme(e.target.value as ThemeType);
    };
}

export default withStyles(styles, { withTheme: true })(
    injectIntl(
        connect(
            mapStateToProps,
            dispatchToProps,
        )(PageLayout),
    ),
);
