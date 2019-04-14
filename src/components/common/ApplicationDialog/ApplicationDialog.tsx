import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { InjectedIntlProps, injectIntl } from "react-intl";
import messages from "./messages";
import DialogContent from "@material-ui/core/DialogContent";
import { withStyles, createStyles, Theme, WithStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import classnames from "classnames";

const styles = (theme: Theme) =>
    createStyles({
        block: {
            backgroundColor: theme.palette.background.default,
            margin: 0,
            minWidth: 300,
        },
        actions: {
            padding: 10,
        },
        closeButton: {
            position: "absolute",
            right: theme.spacing.unit / 2,
            top: theme.spacing.unit / 2,
            color: theme.palette.grey[500],
            fontSize: 12,
        },
    });

export type ApplicationDialogClasses = {
    root?: string;
    title?: string;
    content?: string;
    actions?: string;
};

type OwnProps = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    dialogClasses?: ApplicationDialogClasses;
    onOk?: () => void;
};

type Props = OwnProps & InjectedIntlProps & WithStyles<typeof styles>;
const TITLE_ID = "alert-dialog-title";
const DESCRIPTION_ID = "alert-dialog-description";

class ApplicationDialog extends React.PureComponent<Props> {
    render() {
        const { dialogClasses, children, onClose, classes, intl } = this.props;
        return (
            <Dialog
                open={this.props.isOpen}
                onClose={this._onClose}
                className={dialogClasses && dialogClasses.root}
                aria-labelledby={TITLE_ID}
                aria-describedby={DESCRIPTION_ID}
            >
                <DialogTitle id={TITLE_ID} className={classnames(dialogClasses && dialogClasses.title, classes.block)}>
                    {this.props.title}
                    {onClose && (
                        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                            X
                        </IconButton>
                    )}
                </DialogTitle>
                <DialogContent
                    id={DESCRIPTION_ID}
                    className={classnames(dialogClasses && dialogClasses.content, classes.block)}
                >
                    {children}
                </DialogContent>
                <DialogActions
                    className={classnames(dialogClasses && dialogClasses.actions, classes.block, classes.actions)}
                >
                    <Button onClick={this._onOk} color="primary">
                        {intl.formatMessage(messages.okButtonCaption)}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    private _onClose = () => {
        this.props.onClose();
    };

    private _onOk = () => {
        const { onClose, onOk } = this.props;

        if (onOk) {
            onOk();
        }

        onClose();
    };
}
export default injectIntl(withStyles(styles)(ApplicationDialog));
