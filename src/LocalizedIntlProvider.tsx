import { IntlProvider, addLocaleData } from "react-intl";
import { connect } from "react-redux";
import * as React from "react";
import { StoreState } from "./redux/types";
import { Locale } from "./redux/modules/application/types";
import { loadLocaleAction } from "./redux/modules/application/actions";

const mapStateToProps = (state: StoreState) => {
    return {
        locale: state.application.locale,
    };
};

const dispatchToProps = {
    loadLocale: loadLocaleAction,
};

const messages = {
    [Locale.En]: require("./resources/resources.en.json"),
    [Locale.Ru]: require("./resources/resources.ru.json"),
};

addLocaleData(require("react-intl/locale-data/en"));
addLocaleData(require("react-intl/locale-data/ru"));

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchToProps;

class LocalizedIntlProvider extends React.PureComponent<Props> {
    componentDidMount() {
        this.props.loadLocale();
    }

    render() {
        const { locale, children } = this.props;

        return (
            <IntlProvider
                key={this.props.locale}
                locale={this.props.locale}
                defaultLocale={Locale.En}
                messages={messages[locale]}
            >
                {children}
            </IntlProvider>
        );
    }
}

export default connect(
    mapStateToProps,
    dispatchToProps,
)(LocalizedIntlProvider);
