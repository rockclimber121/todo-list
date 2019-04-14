import { ActionTypes } from "./constants";
import { AlertDialogType, Locale, ThemeType } from "./types";

export const changeLocaleAction = (locale: Locale): { type: ActionTypes.ChangeLocale; locale: Locale } => ({
    type: ActionTypes.ChangeLocale,
    locale,
});

export const changeThemeAction = (theme: ThemeType): { type: ActionTypes.ChangeTheme; theme: ThemeType } => ({
    type: ActionTypes.ChangeTheme,
    theme,
});

export const loadLocaleAction = (): { type: ActionTypes.LoadLocale } => ({
    type: ActionTypes.LoadLocale,
});

export const loadThemeAction = (): { type: ActionTypes.LoadTheme } => ({
    type: ActionTypes.LoadTheme,
});

export const loadLocaleSuccessAction = (locale: Locale): { type: ActionTypes.LoadLocaleSuccess; locale: Locale } => ({
    type: ActionTypes.LoadLocaleSuccess,
    locale,
});

export const loadThemeSuccessAction = (theme: ThemeType): { type: ActionTypes.LoadThemeSuccess; theme: ThemeType } => ({
    type: ActionTypes.LoadThemeSuccess,
    theme,
});

export const openApplicationDialogAction = (
    dialogType: AlertDialogType,
    message: string | string[],
): { type: ActionTypes.OpenAlertDialog; dialogType: AlertDialogType; message: string | string[] } => ({
    type: ActionTypes.OpenAlertDialog,
    dialogType,
    message,
});

export const closeApplicationDialogAction = (): { type: ActionTypes.CloseAlertDialog } => ({
    type: ActionTypes.CloseAlertDialog,
});

export type Actions = ReturnType<typeof openApplicationDialogAction> &
    ReturnType<typeof closeApplicationDialogAction> &
    ReturnType<typeof changeLocaleAction> &
    ReturnType<typeof changeThemeAction> &
    ReturnType<typeof loadLocaleSuccessAction> &
    ReturnType<typeof loadThemeSuccessAction>;
