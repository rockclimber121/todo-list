import React from "react";
import ApplicationDialog from "../ApplicationDialog/ApplicationDialog";
import { Todo } from "../../../redux/modules/Todos/types";
import { InjectedIntlProps, injectIntl } from "react-intl";
import messages from "./messages";
import Input from "@material-ui/core/Input";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

const styles = (theme: Theme) =>
    createStyles({
        input: {
            borderColor: theme.palette.grey[400],
            borderWidth: 1,
            borderStyle: "dashed",
            padding: theme.spacing.unit / 2,
            "&:focus": {
                borderStyle: "solid",
            },
        },
    });

type State = {
    editingTodo?: Todo;
    name?: string;
    description?: string;
};

type OWnProps = {
    todo?: Todo;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    onApply: (todo: Todo) => void;
};

type Props = OWnProps & InjectedIntlProps & WithStyles<typeof styles>;

class TodoDialog extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromProps(props: Props, state: State) {
        if (props.todo != state.editingTodo) {
            return {
                editingTodo: props.todo,
                name: props.todo && props.todo.name,
                description: props.todo && props.todo.description,
            };
        }

        return null;
    }

    render() {
        const { todo, intl, isOpen, onClose, className } = this.props;
        const titleMessage = !!todo
            ? todo.hasCompleted
                ? messages.completedTodoTitle
                : messages.editTodoTitle
            : messages.addTodoTitle;
        return (
            <ApplicationDialog
                title={intl.formatMessage(titleMessage)}
                isOpen={isOpen}
                onClose={onClose}
                dialogClasses={{ content: className }}
                onOk={this._onApply}
            >
                {this._renderName()}
                {this._renderDescription()}
            </ApplicationDialog>
        );
    }

    private _renderName() {
        const { intl, classes, todo } = this.props;
        return (
            <FormControl className={""} fullWidth={true} margin="dense" disabled={todo && todo.hasCompleted}>
                <FormHelperText>{intl.formatMessage(messages.nameLabel)}</FormHelperText>
                <Input
                    value={this.state.name}
                    onChange={this._onChangeName}
                    disableUnderline={true}
                    inputProps={{ className: classes.input }}
                />
            </FormControl>
        );
    }

    private _onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: e.target.value,
        });
    };

    private _renderDescription() {
        const { classes, intl, todo } = this.props;
        return (
            <FormControl fullWidth={true} margin="dense" disabled={todo && todo.hasCompleted}>
                <FormHelperText>{intl.formatMessage(messages.descriptionLabel)}</FormHelperText>
                <Input
                    value={this.state.description}
                    onChange={this._onChangeDescription}
                    multiline={true}
                    rows={5}
                    disableUnderline={true}
                    inputProps={{ className: classes.input }}
                />
            </FormControl>
        );
    }

    private _onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            description: e.target.value,
        });
    };

    private _onApply = () => {
        const newTodo = this.state.editingTodo || { id: 0 };

        this.props.onApply({
            ...newTodo,
            name: this.state.name || this.props.intl.formatMessage(messages.defaultTodoName),
            description: this.state.description,
        });
    };
}

export default injectIntl(withStyles(styles)(TodoDialog));
