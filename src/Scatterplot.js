import React from "react";
import * as d3 from "d3";

import Axis from "./Axis";

class Scatterplot extends React.PureComponent {
    state = {
        xScale: d3
            .scaleLinear()
            .domain([0, d3.max(this.props.data, this.props.xProp)])
            .range([0, this.props.width]),
        yScale: d3
            .scaleLinear()
            .domain([0, d3.max(this.props.data, this.props.yProp)])
            .range([this.props.height, 0])
    };

    static getDerivedStateFromProps(props, state) {
        const { yScale, xScale } = state;

        yScale.range([props.height, 0]);
        xScale.range([0, props.width]);

        return {
            ...state,
            yScale,
            xScale
        };
    }

    render() {
        const {
                x,
                y,
                data,
                height,
                datapoint,
                xProp,
                yProp,
                xLabel,
                yLabel
            } = this.props,
            { yScale, xScale } = this.state;

        console.log(xScale.domain());

        return (
            <g transform={`translate(${x}, ${y})`}>
                {data.map(d =>
                    datapoint({ x: xScale(xProp(d)), y: yScale(yProp(d)) })
                )}
                <Axis x={0} y={0} scale={yScale} type="Left" label={xLabel} />
                <Axis
                    x={0}
                    y={height}
                    scale={xScale}
                    type="Bottom"
                    label={yLabel}
                />
            </g>
        );
    }
}

export default Scatterplot;
