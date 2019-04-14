import React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import ApplicationDialog from "../ApplicationDialog/ApplicationDialog";

export type AlertDialogClasses = {
    root?: string;
    title?: string;
    content?: string;
    actions?: string;
};

type OwnProps = {
    isOpen: boolean;
    title: string;
    message?: string | string[];
    onClose: () => void;
    classes?: AlertDialogClasses;
};

type Props = OwnProps & InjectedIntlProps;

class AlertDialog extends React.PureComponent<Props> {
    render() {
        const { classes, title } = this.props;
        return (
            <ApplicationDialog isOpen={this.props.isOpen} onClose={this._onClose} dialogClasses={classes} title={title}>
                {this._renderMessage()}
            </ApplicationDialog>
        );
    }

    private _onClose = () => {
        this.props.onClose();
    };

    private _renderMessage() {
        const { message } = this.props;

        if (!message) {
            return null;
        }

        return <>{Array.isArray(message) ? message.map(x => <p>{x}</p>) : message}</>;
    }
}
export default injectIntl(AlertDialog);
