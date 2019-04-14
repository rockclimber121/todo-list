import React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import PageLayout from "../common/PageLayout/PageLayout";
import Typography from "@material-ui/core/Typography";
import { injectIntl, InjectedIntlProps } from "react-intl";
import messages from "./messages";

const styles = () =>
    createStyles({
        root: {
            display: "flex",
        },
        text: {
            margin: "auto",
        },
    });

type Props = WithStyles<typeof styles> & InjectedIntlProps;

class NotFoundPage extends React.PureComponent<Props> {
    render() {
        const { classes, intl } = this.props;

        return (
            <PageLayout>
                <div className={classes.root}>
                    <Typography className={classes.text} variant="h3">
                        {intl.formatMessage(messages.pageNotFoundMessage)}
                    </Typography>
                </div>
            </PageLayout>
        );
    }
}

export default injectIntl(withStyles(styles)(NotFoundPage));
