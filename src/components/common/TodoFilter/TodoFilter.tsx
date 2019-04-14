import React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import { injectIntl, InjectedIntlProps } from "react-intl";
import messages from "./messages";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const styles = () =>
    createStyles({
        root: {
            width: "50%",
            margin: "auto",
            display: "flex",
            justifyContent: "flex-end",
        },
    });

type OwnProps = {
    onlyFavorite: boolean;
    onlyNotCompleted: boolean;
    onOnlyFavoriteChange: () => void;
    onOnlyNotCompletedChange: () => void;
};

type Props = OwnProps & WithStyles<typeof styles> & InjectedIntlProps;

class TodoFilter extends React.PureComponent<Props> {
    render() {
        const {
            classes,
            intl,
            onOnlyFavoriteChange,
            onlyFavorite,
            onlyNotCompleted,
            onOnlyNotCompletedChange,
        } = this.props;

        return (
            <div className={classes.root}>
                <FormControlLabel
                    control={<Switch checked={onlyNotCompleted} onChange={onOnlyNotCompletedChange} color="primary" />}
                    className={""}
                    label={intl.formatMessage(messages.onlyNotCompleted)}
                />
                <FormControlLabel
                    control={<Switch checked={onlyFavorite} onChange={onOnlyFavoriteChange} color="primary" />}
                    className={""}
                    label={intl.formatMessage(messages.onlyFavorite)}
                />
            </div>
        );
    }
}

export default injectIntl(withStyles(styles)(TodoFilter));
