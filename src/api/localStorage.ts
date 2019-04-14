import { Todo } from "../redux/modules/Todos/types";
import { ThemeType, Locale } from "../redux/modules/application/types";

const storageTodosKey = "TODO_APPLICATION_ITEMS";
const storageThemeKey = "TODO_APPLICATION_THEME";
const storageLocaleKey = "TODO_APPLICATION_LOCALE";
let cachedTodos: Todo[];
let lastIndex: number;

export function setTodosValue(todos: Todo[]) {
    cachedTodos = [...todos];
    localStorage.setItem(storageTodosKey, JSON.stringify(cachedTodos));
}

export function getTodosValue(): Todo[] {
    if (!cachedTodos) {
        const item = localStorage.getItem(storageTodosKey);
        return item ? JSON.parse(item) : [];
    }

    return cachedTodos;
}

export function generateNewId(todos: Todo[]): number {
    if (lastIndex === undefined) {
        const set = new Set(todos.map(i => i.id));
        let index = -1;

        while (set.has(++index)) {}

        lastIndex = index - 1;
    }

    return ++lastIndex;
}

export function setThemeValue(theme: ThemeType) {
    localStorage.setItem(storageThemeKey, JSON.stringify(theme));
}

export function getThemeValue(): ThemeType {
    debugger;
    const item = localStorage.getItem(storageThemeKey);
    return item ? JSON.parse(item) : ThemeType.Standart;
}

export function setLocaleValue(locale: Locale) {
    localStorage.setItem(storageLocaleKey, JSON.stringify(locale));
}

export function getLocaleValue(): Locale {
    const item = localStorage.getItem(storageLocaleKey);
    return item ? JSON.parse(item) : Locale.En;
}
