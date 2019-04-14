import * as React from "react";
import SvgIconWrapper from "../SvgIconWrapper/SvgIconWrapper";

type Props = {
    fillColor: string;
};

const HomeIcon = ({ fillColor }: Props) => (
    <SvgIconWrapper>
        <path fill={fillColor} d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        <path d="M0 0h24v24H0z" fill="none" />
    </SvgIconWrapper>
);

export default HomeIcon;
