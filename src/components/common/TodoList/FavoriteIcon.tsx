import * as React from "react";
import SvgIconWrapper from "../SvgIconWrapper/SvgIconWrapper";

type Props = {
    isEmpty: boolean;
};

const fillColor = "#ffea00";
const FavoriteIcon = ({ isEmpty }: Props) => (
    <SvgIconWrapper>
        <path
            d="m11.99673,18.31145l7.37568,5.5908l-2.82304,-9.0281l7.37568,-5.46656l-9.04564,0l-2.88268,-9.318l-2.88268,9.318l-9.04564,0l7.37568,5.46656l-2.82304,9.0281l7.37568,-5.5908z"
            fill={isEmpty ? "none" : fillColor}
            stroke={fillColor}
        />
    </SvgIconWrapper>
);

export default FavoriteIcon;
