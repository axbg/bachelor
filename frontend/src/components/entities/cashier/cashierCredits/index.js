import React, { Component } from 'react';
import "./index.css";
import StudentProfile from '../../student/studentProfile';
import SearchBar from 'material-ui-search-bar';

class CashierCredits extends Component {

    constructor() {
        super();
        this.state = {
            showSearchResult: true
        }
    }

    render() {
        return (
            <div className="operator-enrollment-container">
                <div style={{ padding: '10px' }}>
                    <SearchBar
                        placeholder="Caută după număr de ordine sau CNP"
                        onChange={this.updateValue}
                        onRequestSearch={this.searchStudent}
                        style={{
                            margin: '0 auto',
                            height: '80%'
                        }}
                    />
                </div>
                <br />
                <StudentProfile />
            </div>
        )
    }
}

export default CashierCredits;