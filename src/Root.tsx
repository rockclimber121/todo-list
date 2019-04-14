import * as React from "react";
import { Router } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, history } from "./redux/init";
import LocalizedIntlProvider from "./LocalizedIntlProvider";
import ThemeProvider from "./ThemeProvider";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

@DragDropContext(HTML5Backend)
class Root extends React.PureComponent {
    render() {
        return (
            <Provider store={store}>
                <LocalizedIntlProvider>
                    <ThemeProvider>
                        <Router history={history}>
                            <App />
                        </Router>
                    </ThemeProvider>
                </LocalizedIntlProvider>
            </Provider>
        );
    }
}

export default Root;
