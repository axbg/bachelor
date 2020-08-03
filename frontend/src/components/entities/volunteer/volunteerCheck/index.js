import React, { Component } from 'react';
import './index.css'
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { createFlow, sendStudentNotifications } from '../../../../reducers/volunteerReducer';

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
        if (this.state.notify === 0 && value === -1) {
            return;
        }

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
                        <Button style={{ width: '250px' }} type="submit" color="primary" variant="contained"
                            onClick={() => this.props.createFlow(this.state.flux)} label="Submit">
                            Adaugă Flux
                        </Button>
                    </div>
                </div>
                <br />
                <hr />
                <div className="volunteer-check-panel">
                    <h3>Notificări</h3>
                    <div style={{ display: "inline-block" }}>
                        <input className="volunteer-number-input" type="number" min="0" max="100"
                            value={this.state.notify} onChange={() => { }} />
                    </div>
                    <div className="volunteer-check-control">
                        <div className="circled" onClick={() => this.incrementNotify(1)}>+</div>
                        <div className="circled" onClick={() => this.incrementNotify(-1)}>-</div>
                    </div>
                    <div className="volunteer-button">
                        <Button style={{ width: '250px' }} type="submit" color="primary" variant="contained"
                            onClick={() => this.props.sendStudentNotifications(this.state.notify)} label="Submit">
                            Trimite Notificări
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ studentReducer }) => ({
});

const mapDispatchToProps = { createFlow, sendStudentNotifications };

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerCheck);