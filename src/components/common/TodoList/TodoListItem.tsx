import React from "react";
import { Todo } from "../../../redux/modules/Todos/types";
import { WithStyles, withStyles, createStyles, Theme } from "@material-ui/core/styles";
import FavoriteIcon from "./FavoriteIcon";
import CompleteIcon from "./CompleteIcon";
import classnames from "classnames";
import messages from "./messages";
import { InjectedIntlProps, injectIntl } from "react-intl";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: theme.spacing.unit,
            margin: theme.spacing.unit / 2,
            borderRadius: theme.spacing.unit / 2,
            borderWidth: theme.spacing.unit / 4,
            borderStyle: "solid",
            borderColor: theme.palette.action.hover,
            cursor: "pointer",
            backgroundColor: theme.palette.primary.light,
            "&:hover": {
                opacity: 0.9,
            },
        },
        completed: {
            backgroundColor: theme.palette.secondary.main,
        },
        name: {
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit / 2,
            marginRight: 2 * theme.spacing.unit,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        addButton: {
            margin: "auto",
        },
        buttonsContainer: {
            flex: "none",
        },
        button: {
            height: "100%",
        },
    });

export type TodoListItemProps = {
    todo?: Todo;
    onFavoriteClick?: () => void;
    onCompleteClick?: () => void;
    onItemClick?: () => void;
    className?: string;
};

type Props = TodoListItemProps & WithStyles<typeof styles> & InjectedIntlProps;

class TodoListItem extends React.PureComponent<Props> {
    render() {
        const { todo, classes, onItemClick, intl, className } = this.props;

        return (
            <div
                className={classnames(className, classes.root, { [classes.completed]: todo && todo.hasCompleted })}
                title={todo ? todo.description : intl.formatMessage(messages.addNewButtonCaption)}
                onDoubleClick={todo && onItemClick}
                onClick={(!todo && onItemClick) || undefined}
            >
                <Typography className={classnames(classes.name, { [classes.addButton]: !todo })} variant="h5">
                    {todo ? todo.name : "+"}
                </Typography>
                {todo && (
                    <div className={classes.buttonsContainer}>
                        {!todo.hasCompleted && this._renderCompleteButton()}
                        {this._renderFavoriteButton(todo)}
                    </div>
                )}
            </div>
        );
    }

    private _renderCompleteButton() {
        const { classes, intl } = this.props;
        return (
            <IconButton
                onClick={this._onCompleteClick}
                className={classes.button}
                title={intl.formatMessage(messages.completeButtonCaption)}
            >
                <CompleteIcon />
            </IconButton>
        );
    }

    private _renderFavoriteButton(todo: Todo) {
        const { classes, intl } = this.props;
        return (
            <IconButton
                onClick={this._onFavoriteClick}
                className={classes.button}
                title={intl.formatMessage(messages.favoriteButtonCaption)}
            >
                <FavoriteIcon isEmpty={!todo.isFavorite} />
            </IconButton>
        );
    }

    private _onFavoriteClick = (e: React.MouseEvent) => {
        const { onFavoriteClick } = this.props;

        if (onFavoriteClick) {
            onFavoriteClick();
            e.stopPropagation();
        }
    };

    private _onCompleteClick = (e: React.MouseEvent) => {
        const { onCompleteClick } = this.props;

        if (onCompleteClick) {
            onCompleteClick();
            e.stopPropagation();
        }
    };
}

export default injectIntl(withStyles(styles)(TodoListItem));
