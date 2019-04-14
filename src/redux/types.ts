import { ApplicationStore } from "./modules/application/types";
import { TodosStore } from "./modules/Todos/types";

export type StoreState = {
    application: ApplicationStore;
    todos: TodosStore;
};
