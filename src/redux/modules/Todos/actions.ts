import { ActionTypes } from "./constants";
import { Todo } from "./types";

export const loadTodoListAction = (): { type: ActionTypes.LoadTodoList } => ({
    type: ActionTypes.LoadTodoList,
});

export const loadTodoListActionSuccess = (todos: Todo[]): { type: ActionTypes.LoadTodoListSuccess; todos: Todo[] } => ({
    type: ActionTypes.LoadTodoListSuccess,
    todos,
});

export const updateTodoAction = (todo: Todo): { type: ActionTypes.UpdateTodo; todo: Todo } => ({
    type: ActionTypes.UpdateTodo,
    todo,
});

export const updateTodosAction = (todos: Todo[]): { type: ActionTypes.UpdateTodos; todos: Todo[] } => ({
    type: ActionTypes.UpdateTodos,
    todos,
});

export const addTodoAction = (todo: Todo): { type: ActionTypes.AddTodo; todo: Todo } => ({
    type: ActionTypes.AddTodo,
    todo,
});

export const addTodoSuccessAction = (todo: Todo): { type: ActionTypes.AddTodoSuccess; todo: Todo } => ({
    type: ActionTypes.AddTodoSuccess,
    todo,
});

export type Actions = ReturnType<typeof loadTodoListAction> &
    ReturnType<typeof loadTodoListActionSuccess> &
    ReturnType<typeof updateTodoAction> &
    ReturnType<typeof updateTodosAction> &
    ReturnType<typeof addTodoSuccessAction>;
