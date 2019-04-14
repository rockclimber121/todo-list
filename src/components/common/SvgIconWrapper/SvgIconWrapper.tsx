import * as React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

export default (props: SvgIconProps) => (
    <SvgIcon style={{ fontSize: 24 }} viewBox="0 0 24 24" {...props}>
        {props.children}
    </SvgIcon>
);
