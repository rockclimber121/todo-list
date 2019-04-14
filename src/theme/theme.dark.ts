import { createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import purple from "@material-ui/core/colors/purple";

const theme = createMuiTheme({
    palette: {
        primary: { main: purple[600] },
        secondary: { main: indigo[500] },
        background: { default: purple[900] },
        text: {
            primary: "#fff",
            secondary: purple[100],
            disabled: indigo[100],
        },
    },
    props: {
        MuiMenuItem: {
            style: {
                color: purple[800],
            },
        },
    },
});

export default theme;
