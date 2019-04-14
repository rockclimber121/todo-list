import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import lightBlue from "@material-ui/core/colors/lightBlue";
import deepPurple from "@material-ui/core/colors/deepPurple";

const theme = createMuiTheme({
    palette: {
        primary: { main: blue[600] },
        secondary: { main: blue[200] },
        background: { default: lightBlue[50] },
        text: {
            secondary: deepPurple[500],
        },
    },
});

export default theme;
