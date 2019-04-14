import React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { StoreState } from "../../../redux/types";
import { WithStyles, createStyles, withStyles, Theme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { AlertDialogType } from "../../../redux/modules/application/types";
import AlertDialog, { AlertDialogClasses } from "./AlertDialog";
import messages from "./messages";
import { closeApplicationDialogAction } from "../../../redux/modules/application/actions";

const styles = (theme: Theme) =>
    createStyles({
        root: {},
        errorTitle: {
            color: theme.palette.error.main,
        },
        successTitle: {
            color: theme.palette.primary.main,
        },
        warningTitle: {
            color: theme.palette.error.light,
        },
        informationTitle: {
            color: theme.palette.secondary.main,
        },
    });

type OwnProps = {};

const dispatchToProps = {
    onClose: closeApplicationDialogAction,
};

const mapStateToProps = (state: StoreState) => {
    return {
        type: state.application.alertDialog.type,
        hasOpen: state.application.alertDialog.hasOpen,
        message: state.application.alertDialog.message,
    };
};

type Props = OwnProps &
    InjectedIntlProps &
    WithStyles<typeof styles> &
    ReturnType<typeof mapStateToProps> &
    typeof dispatchToProps;

class AlertDialogContainer extends React.PureComponent<Props> {
    render = () => {
        const { message, onClose, hasOpen } = this.props;
        return (
            <AlertDialog
                isOpen={hasOpen}
                message={message}
                onClose={onClose}
                title={this._getDialogTitle()}
                classes={this._getDialogClasses()}
            />
        );
    };

    private _getDialogTitle = (): string => {
        switch (this.props.type) {
            case AlertDialogType.Error:
                return this.props.intl.formatMessage(messages.errorTitle);
            case AlertDialogType.Success:
                return this.props.intl.formatMessage(messages.successTitle);
            case AlertDialogType.Warning:
                return this.props.intl.formatMessage(messages.warningTitle);
            case AlertDialogType.Information:
            default:
                return this.props.intl.formatMessage(messages.informationTitle);
        }
    };

    private _getDialogClasses = (): AlertDialogClasses => {
        const { classes } = this.props;
        const general = {
            root: classes.root,
        };
        switch (this.props.type) {
            case AlertDialogType.Error:
                return {
                    ...general,
                    title: classes.errorTitle,
                };
            case AlertDialogType.Success:
                return {
                    ...general,
                    title: classes.successTitle,
                };
            case AlertDialogType.Warning:
                return {
                    ...general,
                    title: classes.warningTitle,
                };
            case AlertDialogType.Information:
            default:
                return {
                    ...general,
                    title: classes.informationTitle,
                };
        }
    };
}

export default injectIntl(
    connect(
        mapStateToProps,
        dispatchToProps,
    )(withStyles(styles)(AlertDialogContainer)),
);
