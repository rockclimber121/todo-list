import React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import TodoList from "../common/TodoList/TodoList";
import { StoreState } from "../../redux/types";
import {
    loadTodoListAction,
    updateTodoAction,
    addTodoAction,
    updateTodosAction,
} from "../../redux/modules/Todos/actions";
import { connect } from "react-redux";
import { Todo } from "../../redux/modules/Todos/types";
import TodoDialog from "../common/TodoDialog/TodoDialog";
import TodoFilter from "../common/TodoFilter/TodoFilter";
import PageLayout from "../common/PageLayout/PageLayout";

const styles = () =>
    createStyles({
        root: {
            display: "flex",
            height: "100%",
            flexDirection: "column",
        },
        header: {
            width: "50%",
            margin: "auto",
        },
        todoList: {
            width: "50%",
            margin: "auto",
            height: "100%",
        },
        todoDialog: {
            width: 500,
        },
    });

const dispatchToProps = {
    loadTodos: loadTodoListAction,
    updateTodo: updateTodoAction,
    updateTodos: updateTodosAction,
    addTodo: addTodoAction,
};

const mapStateToProps = (state: StoreState) => {
    return {
        todos: state.todos.data,
    };
};

type State = {
    todoForEdit?: Todo;
    todoDailogHasOpen: boolean;
    onlyFavorite?: boolean;
    onlyNotCompleted?: boolean;
};

type Props = WithStyles<typeof styles> & ReturnType<typeof mapStateToProps> & typeof dispatchToProps;

class HomePage extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            todoDailogHasOpen: false,
        };
    }

    componentDidMount() {
        this.props.loadTodos();
    }

    render() {
        const { classes, updateTodo, updateTodos } = this.props;

        return (
            <PageLayout>
                <div className={classes.root}>
                    <TodoFilter
                        onlyFavorite={!!this.state.onlyFavorite}
                        onlyNotCompleted={!!this.state.onlyNotCompleted}
                        onOnlyFavoriteChange={this._onOnlyFavoriteChange}
                        onOnlyNotCompletedChange={this._onOnlyNotCompletedChange}
                    />
                    <TodoList
                        className={classes.todoList}
                        todos={this._getFilteredTodos()}
                        onChange={updateTodo}
                        onAddNewTodo={this._onAddNewTodo}
                        onEditTodo={this._onEditTodo}
                        onChangeOrder={updateTodos}
                    />
                    {this.state.todoDailogHasOpen && (
                        <TodoDialog
                            todo={this.state.todoForEdit}
                            isOpen={true}
                            onClose={this._onTodoDialogClose}
                            className={classes.todoDialog}
                            onApply={this._onApplyChages}
                        />
                    )}
                </div>
            </PageLayout>
        );
    }

    private _getFilteredTodos() {
        const { onlyFavorite = false, onlyNotCompleted = false } = this.state;

        if (onlyFavorite || onlyNotCompleted) {
            return this.props.todos.filter(
                x => (!onlyFavorite || x.isFavorite) && (!onlyNotCompleted || !x.hasCompleted),
            );
        }

        return this.props.todos;
    }

    private _onAddNewTodo = () => {
        this.setState({
            todoDailogHasOpen: true,
            todoForEdit: undefined,
        });
    };

    private _onEditTodo = (todo: Todo) => {
        this.setState({
            todoDailogHasOpen: true,
            todoForEdit: todo,
        });
    };

    private _onTodoDialogClose = () => {
        this.setState({
            todoDailogHasOpen: false,
        });
    };

    private _onApplyChages = (todo: Todo) => {
        if (this.state.todoForEdit) {
            this.props.updateTodo(todo);
        } else {
            this.props.addTodo(todo);
        }
    };

    private _onOnlyFavoriteChange = () => {
        this.setState({
            onlyFavorite: !this.state.onlyFavorite,
        });
    };

    private _onOnlyNotCompletedChange = () => {
        this.setState({
            onlyNotCompleted: !this.state.onlyNotCompleted,
        });
    };
}

export default connect(
    mapStateToProps,
    dispatchToProps,
)(withStyles(styles)(HomePage));
