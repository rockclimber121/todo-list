export type ApplicationStore = {
    locale: Locale;
    alertDialog: AlertDialogProps;
    themeType: ThemeType;
};

export type AlertDialogProps = {
    message: string | string[];
    hasOpen: boolean;
    type: AlertDialogType;
};

export enum AlertDialogType {
    Warning,
    Error,
    Information,
    Success,
}

export enum Locale {
    En = "en",
    Ru = "ru",
}

export enum ThemeType {
    Standart = "standart",
    Dark = "dark",
    Sky = "sky",
}
