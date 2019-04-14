import { defineMessages } from "react-intl";

const messages = defineMessages({
    editTodoTitle: {
        defaultMessage: "Edit",
        description: "Application dialog title for edit.",
        id: "components.TodoDialog.editTodoTitle",
    },
    addTodoTitle: {
        defaultMessage: "Create",
        description: "Application dialog title for add.",
        id: "components.TodoDialog.addTodoTitle",
    },
    completedTodoTitle: {
        defaultMessage: "Completed Todo",
        description: "Application dialog title for completed todo.",
        id: "components.TodoDialog.completedTodoTitle",
    },
    nameLabel: {
        defaultMessage: "Name",
        description: "Name input label.",
        id: "components.TodoDialog.nameLabel",
    },
    descriptionLabel: {
        defaultMessage: "Description",
        description: "Description input label.",
        id: "components.TodoDialog.descriptionLabel",
    },
    defaultTodoName: {
        defaultMessage: "New",
        description: "Default name for todo.",
        id: "components.TodoDialog.defaultTodoName",
    },
});

export default messages;
