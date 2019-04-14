import { updateTodoAtServer, getTodoListFromServer, addTodoAtServer, updateTodosAtServer } from "../../../api/todos";
import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import {
    loadTodoListActionSuccess,
    updateTodoAction,
    addTodoAction,
    addTodoSuccessAction,
    updateTodosAction,
} from "./actions";
import { ActionTypes } from "./constants";
import { openErrorDialog } from "../application/sagas";

export const todosSagas = [
    takeLatest(ActionTypes.LoadTodoList, loadTodoList),
    takeEvery(ActionTypes.UpdateTodo, updateTodo),
    takeEvery(ActionTypes.UpdateTodos, updateTodos),
    takeEvery(ActionTypes.AddTodo, addTodo),
];

export function* loadTodoList() {
    try {
        const todos = yield call(getTodoListFromServer);
        yield put(loadTodoListActionSuccess(todos));
    } catch (e) {
        yield put(openErrorDialog(e));
    }
}

export function* updateTodo(action: ReturnType<typeof updateTodoAction>) {
    try {
        yield call(updateTodoAtServer, action.todo);
    } catch (e) {
        yield put(openErrorDialog(e));
    }
}

export function* updateTodos(action: ReturnType<typeof updateTodosAction>) {
    try {
        yield call(updateTodosAtServer, action.todos);
    } catch (e) {
        yield put(openErrorDialog(e));
    }
}

export function* addTodo(action: ReturnType<typeof addTodoAction>) {
    try {
        const addedTodo = yield call(addTodoAtServer, action.todo);
        yield put(addTodoSuccessAction(addedTodo));
    } catch (e) {
        yield put(openErrorDialog(e));
    }
}
