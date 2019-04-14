import { createBrowserHistory } from "history";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, Store, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { StoreState } from "./types";
import { all } from "redux-saga/effects";
import applicationReducer from "./modules/application/reducer";
import { todosSagas } from "./modules/Todos/sagas";
import todosReducer from "./modules/Todos/reducer";
import { applicationSagas } from "./modules/application/sagas";

export const history = createBrowserHistory();

export function* watchAll() {
    yield all([...todosSagas, ...applicationSagas]);
}

export const rootReducer = () =>
    combineReducers({
        application: applicationReducer,
        todos: todosReducer,
    });

const sagaMiddleware = createSagaMiddleware();

export const store: Store<StoreState> = createStore(
    rootReducer(),
    composeWithDevTools(applyMiddleware(sagaMiddleware, logger)),
);
sagaMiddleware.run(watchAll);
