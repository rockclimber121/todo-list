import { ApplicationStore, Locale, AlertDialogType, ThemeType } from "./types";
import { Actions } from "./actions";
import { ActionTypes } from "./constants";
import { produce } from "immer";

const initialState: ApplicationStore = {
    locale: Locale.En,
    alertDialog: {
        type: AlertDialogType.Success,
        hasOpen: false,
        message: "",
    },
    themeType: ThemeType.Standart,
};

export default function applicationReducer(state: ApplicationStore = initialState, action: Actions) {
    switch (action.type) {
        case ActionTypes.OpenAlertDialog:
            return produce(state, draft => {
                draft.alertDialog = {
                    message: action.message,
                    type: action.dialogType,
                    hasOpen: true,
                };
            });
        case ActionTypes.CloseAlertDialog:
            return produce(state, draft => {
                draft.alertDialog.hasOpen = false;
            });
        case ActionTypes.LoadLocaleSuccess:
        case ActionTypes.ChangeLocale:
            return produce(state, draft => {
                draft.locale = action.locale;
            });
        case ActionTypes.LoadThemeSuccess:
        case ActionTypes.ChangeTheme:
            return produce(state, draft => {
                draft.themeType = action.theme;
            });
        default:
            return state;
    }
}
