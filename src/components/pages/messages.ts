import { defineMessages } from "react-intl";

const messages = defineMessages({
    pageNotFoundMessage: {
        defaultMessage: "Looks like nothing is here",
        description: "Message on not found page",
        id: "components.pageNotFound.pageNotFoundMessage",
    },
    aboutPageMessage: {
        defaultMessage:
            "This application use local storage for saving data. Also you can double click on an item for edit.",
        description: "Message on about page",
        id: "components.pageNotFound.aboutPageMessage",
    },
});

export default messages;
