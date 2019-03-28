import React, { useContext } from "react";
import styled from "styled-components";

import DashboardContext from "./DashboardContext";

const Circle = styled.circle`
    fill: steelblue;
    fill-opacity: 0.7;
    stroke: steelblue;
    stroke-width: 1.5px;
`;

function Datapoint({ x, y, breed }) {
    const { highlightedBreed, highlightBreed } = useContext(DashboardContext);

    return (
        <Circle
            cx={x}
            cy={y}
            r={highlightedBreed === breed ? 10 : 3}
            onMouseOver={() => highlightBreed(breed)}
            onMouseOut={() => highlightBreed(null)}
        />
    );
}

export default Datapoint;
