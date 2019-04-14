import { ActionTypes } from "./constants";
import { takeLatest, call, put } from "redux-saga/effects";
import {
    loadLocaleSuccessAction,
    loadThemeSuccessAction,
    changeLocaleAction,
    changeThemeAction,
    openApplicationDialogAction,
} from "./actions";
import {
    loadLocaleFromServer,
    loadThemeFromServer,
    changeLocaleAtServer,
    changeThemeAtServer,
} from "../../../api/todos";
import { AlertDialogType } from "./types";

export const applicationSagas = [
    takeLatest(ActionTypes.LoadLocale, loadLocale),
    takeLatest(ActionTypes.LoadTheme, loadTheme),
    takeLatest(ActionTypes.ChangeLocale, changeLocale),
    takeLatest(ActionTypes.ChangeTheme, changeTheme),
];

export const openErrorDialog = (error: ErrorEvent) => {
    return openApplicationDialogAction(AlertDialogType.Error, error.message);
};

export function* loadLocale() {
    try {
        const locale = yield call(loadLocaleFromServer);
        yield put(loadLocaleSuccessAction(locale));
    } catch (e) {
        yield put(openErrorDialog(e));
    }
}

export function* loadTheme() {
    try {
        const theme = yield call(loadThemeFromServer);
        yield put(loadThemeSuccessAction(theme));
    } catch (e) {
        yield put(openErrorDialog(e));
    }
}

export function* changeLocale(action: ReturnType<typeof changeLocaleAction>) {
    try {
        yield call(changeLocaleAtServer, action.locale);
    } catch (e) {
        yield put(openErrorDialog(e));
    }
}

export function* changeTheme(action: ReturnType<typeof changeThemeAction>) {
    try {
        yield call(changeThemeAtServer, action.theme);
    } catch (e) {
        yield put(openErrorDialog(e));
    }
}
