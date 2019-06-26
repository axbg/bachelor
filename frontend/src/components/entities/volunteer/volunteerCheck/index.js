import React, { Component } from 'react';
import './index.css'
import Button from "@material-ui/core/Button";

class VolunteerCheck extends Component {

    constructor() {
        super();
        this.state = {
            flux: 0,
            notify: 0
        }
    }

    incrementFlux = (value) => {
        this.setState({
            flux: this.state.flux + value
        })
    }

    incrementNotify = (value) => {
        this.setState({
            notify: this.state.notify + value
        })
    }

    render() {
        return (
            <div className="volunteer-check-container">
                <div className="volunteer-check-panel">
                    <h3>Flux</h3>
                    <div style={{ display: "inline-block" }}>
                        <input className="volunteer-number-input" type="number" min="-100" max="100"
                            value={this.state.flux} onChange={() => { }} />
                    </div>
                    <div className="volunteer-check-control">
                        <div className="circled" onClick={() => this.incrementFlux(1)}>+</div>
                        <div className="circled" onClick={() => this.incrementFlux(-1)}>-</div>
                    </div>
                    <div className="volunteer-button">
                        <Button style={{ width: '250px' }} type="submit" color="primary" variant="contained" label="Submit">
                            Adaugă Flux
                        </Button>
                    </div>
                </div>
                <br />
                <hr />
                <div className="volunteer-check-panel">
                    <h3>Notificări</h3>
                    <div style={{ display: "inline-block" }}>
                        <input className="volunteer-number-input" type="number" min="-100" max="100"
                            value={this.state.notify} onChange={() => { }} />
                    </div>
                    <div className="volunteer-check-control">
                        <div className="circled" onClick={() => this.incrementNotify(1)}>+</div>
                        <div className="circled" onClick={() => this.incrementNotify(-1)}>-</div>
                    </div>
                    <div className="volunteer-button">
                        <Button style={{ width: '250px' }} type="submit" color="primary" variant="contained" label="Submit">
                            Trimite Notificări
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default VolunteerCheck;