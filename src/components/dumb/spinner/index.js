import React from 'react';
import { css } from '@emotion/core';
import { ClimbingBoxLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const container = css`
    background-color: red;
`;

class Spinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    render() {
        return (
            <div style={{ backgroundColor: "whitesmoke", height: "100%", textAlign: "center" }}>
                <div className='sweet-loading' style={{ paddingTop: "20vh" }}>
                    <ClimbingBoxLoader
                        css={override}
                        sizeUnit={"px"}
                        size={20}
                        color={'#123abc'}
                        loading={this.state.loading}
                    />
                </div>
                <h2>Launching the rocket...</h2>
            </div>
        )
    }
}

export default Spinner;