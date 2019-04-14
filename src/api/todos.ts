import { Todo } from "../redux/modules/Todos/types";
import {
    getTodosValue,
    setTodosValue,
    generateNewId,
    setThemeValue,
    setLocaleValue,
    getThemeValue,
    getLocaleValue,
} from "./localStorage";
import { Locale, ThemeType } from "../redux/modules/application/types";

export function getTodoListFromServer(): Todo[] {
    return getTodosValue();
}

export function updateTodoAtServer(todo: Todo) {
    const todos = getTodosValue();
    const newTodos = todos.map(x => (x.id === todo.id ? { ...todo } : x));
    setTodosValue(newTodos);
}

export function updateTodosAtServer(todos: Todo[]) {
    setTodosValue(todos);
}

export function addTodoAtServer(todo: Todo) {
    const todos = getTodosValue();
    const newTodo = {
        ...todo,
        id: generateNewId(todos),
    };
    todos.push(newTodo);
    setTodosValue(todos);
    return newTodo;
}

export function changeLocaleAtServer(locale: Locale) {
    setLocaleValue(locale);
}

export function changeThemeAtServer(theme: ThemeType) {
    setThemeValue(theme);
}

export function loadLocaleFromServer() {
    return getLocaleValue();
}

export function loadThemeFromServer() {
    return getThemeValue();
}
