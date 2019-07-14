import React, { Component } from 'react';
import './index.css'
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { logout } from '../../../../reducers/authReducer';
import { getPositions, createPositionRequest } from '../../../../reducers/volunteerReducer';
import { toastr } from 'react-redux-toastr';

class VolunteerPosition extends Component {

    constructor() {
        super();
        this.state = {
            positionId: 0
        }
    }

    componentDidMount() {
        if (!this.props.positions) {
            this.props.getPositions();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.positions[0]) {
            this.setState({
                positionId: nextProps.positions[0].id
            })
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="volunteer-position-container">
                <h3>Poziție curentă</h3>
                {this.props.user.position ?
                    <h2>{this.props.user.position.position}</h2>
                    : <h2>Nealocat</h2>
                }
                <Button color="primary" variant="contained" label="Submit" onClick={() => this.props.logout()}> 
                        Logout
                </Button>
                <div className="volunteer-position-request">
                    <h4>Dorești schimbarea poziției?</h4>
                    <br />
                    {
                        this.props.positions ?
                            <div className="select">
                                <select className="select-text" name="positionId" onChange={(e) => this.onChange(e)} value={this.state.positionId} >
                                    {this.props.positions.map((position, key) => <option key={key} value={position.id}>{position.position}</option>)}
                                </select>
                                <span className="select-highlight"></span>
                                <span className="select-bar"></span>
                                <label className="select-label">Poziție</label>
                                <br />
                            </div>
                            : ""
                    }
                    <br />
                    <Button type="submit" color="primary" variant="contained" label="Submit"
                        onClick={() => {
                            this.props.createPositionRequest(this.state.positionId)
                            toastr.success("Cererea a fost înregistrată");
                        }}>Trimite
                    </Button>
                    <br />
                    <br />
                </div>
            </div >
        )
    }
}

const mapStateToProps = ({ volunteerReducer }) => ({
    user: volunteerReducer.volunteer,
    positions: volunteerReducer.positions
});

const mapDispatchToProps = { getPositions, createPositionRequest, logout };

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerPosition);