import React from "react";
import { Todo } from "../../../redux/modules/Todos/types";
import TodoListItem from "./TodoListItem";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import MobileTodoListItem from "./MobileTodoListItem";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            overflowY: "auto",
        },
        addButton: {
            margin: theme.spacing.unit / 2,
        },
        draggingItem: {
            cursor: "pointer",
        },
    });

type OwnProps = {
    todos: Todo[];
    onChange: (todo: Todo) => void;
    className?: string;
    onAddNewTodo: () => void;
    onEditTodo: (todo: Todo) => void;
    onChangeOrder: (newList: Todo[]) => void;
};

type Props = OwnProps & WithStyles<typeof styles>;

type State = {
    draftingList?: Todo[];
};

class TodoList extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        const { todos, onAddNewTodo, className, onEditTodo, classes } = this.props;
        const currentTodos = this.state.draftingList || todos;

        return (
            <div className={classNames(className, classes.root)}>
                <TodoListItem onItemClick={onAddNewTodo} />
                {currentTodos &&
                    currentTodos.map((x, index) => (
                        <MobileTodoListItem
                            key={index}
                            todo={x}
                            onCompleteClick={() => {
                                this._onCompleteClick(x);
                            }}
                            onFavoriteClick={() => {
                                this._onFavoriteClick(x);
                            }}
                            onItemClick={() => {
                                onEditTodo(x);
                            }}
                            draggingClassName={classes.draggingItem}
                            onChangeOrder={(newOrderIndex: number) => {
                                this._onChangeOrder(x, newOrderIndex);
                            }}
                            onDropped={() => {
                                this._onItemDroped(x);
                            }}
                            order={index}
                        />
                    ))}
            </div>
        );
    }

    private _onCompleteClick(todo: Todo) {
        this.props.onChange({
            ...todo,
            hasCompleted: !todo.hasCompleted,
        });
    }

    private _onFavoriteClick(todo: Todo) {
        this.props.onChange({
            ...todo,
            isFavorite: !todo.isFavorite,
        });
    }

    private _onChangeOrder(todo: Todo, newOrderIndex: number) {
        const { todos } = this.props;
        const currentTodos = this.state.draftingList || todos;

        if (newOrderIndex >= 0 && newOrderIndex < currentTodos.length) {
            const newList = [...currentTodos];
            const oldIndex = newList.findIndex(x => x.id === todo.id);
            const slide = newList[oldIndex];
            newList.splice(oldIndex, 1);
            newList.splice(newOrderIndex, 0, slide);
            this.setState({
                draftingList: newList,
            });
        }
    }

    private _onItemDroped(todo: Todo) {
        if (this.state.draftingList && this.state.draftingList !== this.props.todos) {
            this.props.onChangeOrder(this.state.draftingList);
            this.setState({
                draftingList: undefined,
            });
        }
    }
}

export default withStyles(styles)(TodoList);
