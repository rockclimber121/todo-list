export type TodosStore = {
    data: Todo[];
};

export type Todo = {
    id: number;
    name: string;
    description?: string;
    hasCompleted?: boolean;
    isFavorite?: boolean;
    dateCompleted?: Date;
};
