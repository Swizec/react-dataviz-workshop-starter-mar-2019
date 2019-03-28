import React, { Component } from "react";
import logo from "./logo.svg";
import * as d3 from "d3";
import styled from "styled-components";
import "./App.css";

import DashboardContext from "./DashboardContext";

const Svg = styled.svg`
    width: 100%;
    min-height: 1024px;
    position: absolute;
    left: 0px;
    top: 300px;
`;

class App extends Component {
    state = {
        data: null,
        highlightedBreed: null,
        highlightBreed: breed => this.setState({ highlightedBreed: breed }),
        width: 1024
    };

    componentDidMount() {
        Promise.all([
            d3.csv("/data/breed_info.csv", d => ({
                breed: d["Breed"].toLowerCase(),
                height: [
                    Number(d["height_low_inches"]),
                    Number(d["height_high_inches"])
                ],
                weight: [
                    Number(d["weight_low_lbs"]),
                    Number(d["weight_high_lbs"])
                ]
            })),
            d3.csv("/data/dog_intelligence.csv", d => ({
                breed: d["Breed"].toLowerCase(),
                reps: [Number(d["reps_lower"]), Number(d["reps_higher"])],
                obey: Number(d["obey"].replace("%", ""))
            })),
            d3.csv("/data/dog_sales.csv", d => ({
                breed: d["Primary Breed"].toLocaleLowerCase(),
                sales: Number(d["Num2015"])
            }))
        ]).then(([breeds, intelligence, sales]) => {
            const data = d3
                .nest()
                .key(d => d.breed)
                .entries([...breeds, ...intelligence, ...sales])
                .filter(({ values }) => values.length > 1)
                .reduce(
                    (data, { key, values }) => ({
                        ...data,
                        [key]: values.reduce(
                            (obj, entry) => ({ ...obj, ...entry }),
                            {}
                        )
                    }),
                    {}
                );

            console.log(data);

            this.setState({ data });
        });
    }

    render() {
        const { data } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title"> Welcome to React </h1>{" "}
                </header>{" "}
                {data !== null ? (
                    <DashboardContext.Provider value={this.state} />
                ) : null}
            </div>
        );
    }
}

export default App;
