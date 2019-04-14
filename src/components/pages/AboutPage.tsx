import React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import PageLayout from "../common/PageLayout/PageLayout";
import Typography from "@material-ui/core/Typography";
import { InjectedIntlProps, injectIntl } from "react-intl";
import messages from "./messages";

const styles = () =>
    createStyles({
        root: {
            display: "flex",
        },
        text: {
            margin: "auto",
            width: "50%",
        },
    });

type Props = WithStyles<typeof styles> & InjectedIntlProps;

class AboutPage extends React.PureComponent<Props> {
    render() {
        const { classes, intl } = this.props;

        return (
            <PageLayout>
                <div className={classes.root}>
                    <Typography className={classes.text} variant="h5">
                        {intl.formatMessage(messages.aboutPageMessage)}
                    </Typography>
                </div>
            </PageLayout>
        );
    }
}

export default injectIntl(withStyles(styles)(AboutPage));
