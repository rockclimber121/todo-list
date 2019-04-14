import { TodosStore } from "./types";
import { Actions } from "./actions";
import { ActionTypes } from "./constants";
import { produce } from "immer";

const initialState: TodosStore = {
    data: [],
};

export default function todosReducer(state: TodosStore = initialState, action: Actions) {
    switch (action.type) {
        case ActionTypes.LoadTodoListSuccess:
            return produce(state, draft => {
                draft.data = action.todos;
            });
        case ActionTypes.UpdateTodo:
            return produce(state, draft => {
                draft.data[draft.data.findIndex(x => x.id === action.todo.id)] = action.todo;
            });
        case ActionTypes.UpdateTodos:
            return produce(state, draft => {
                draft.data = action.todos;
            });
        case ActionTypes.AddTodoSuccess:
            return produce(state, draft => {
                draft.data.push(action.todo);
            });
        default:
            return state;
    }
}
