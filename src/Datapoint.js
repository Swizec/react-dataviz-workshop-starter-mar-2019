import React from "react";
import styled from "styled-components";

const Circle = styled.circle`
    fill: steelblue;
    fill-opacity: 0.7;
    stroke: steelblue;
    stroke-width: 1.5px;
`;

class Datapoint extends React.Component {
    state = {
        r: 3
    };

    highlight = () => {
        this.setState({ r: 10 });
    };

    unhighlight = () => {
        this.setState({ r: 3 });
    };

    render() {
        const { x, y } = this.props;

        return (
            <Circle
                cx={x}
                cy={y}
                r={this.state.r}
                onMouseOver={this.highlight}
                onMouseOut={this.unhighlight}
            />
        );
    }
}

export default Datapoint;
