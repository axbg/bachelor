import React, { Component } from 'react';
import './index.css'
import Button from "@material-ui/core/Button";

class VolunteerPosition extends Component {
    render() {
        return (
            <div className="volunteer-position-container">
                <h3>Poziție curentă</h3>
                <h2>Ușă Intrare</h2>
                <div className="volunteer-position-request">
                    <h4>Dorești schimbarea poziției?</h4>
                    <br />
                    <div className="select">
                        <select className="select-text" required>
                            <option value="" disabled></option>
                            <option value="1">Scară 1</option>
                            <option value="2">Scară 2</option>
                            <option value="3">Sală Dosare</option>
                            <option value="4">Asistent Operator</option>
                        </select>
                        <span className="select-highlight"></span>
                        <span className="select-bar"></span>
                        <label className="select-label">Selectează noua poziție</label>
                    </div>
                    <br />
                    <Button type="submit" color="primary" variant="contained" label="Submit" >Trimite</Button>
                </div>
            </div >
        )
    }
}

export default VolunteerPosition;