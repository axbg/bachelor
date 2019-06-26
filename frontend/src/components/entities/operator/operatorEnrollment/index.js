import React, { Component } from 'react';
import "./index.css";
import StudentProfile from '../../student/studentProfile';
import SearchBar from 'material-ui-search-bar'
import { Button } from '@material-ui/core';
import PageableList from '../../../dumb/pageableList';

class OperatorEnrollment extends Component {

    constructor() {
        super();
        this.state = {
            showSearchResult: true
        }
    }

    showWithdraw = () => {
        this.setState({
            showSearchResult: false
        })
    }

    updateValue = (e) => {

    }

    searchStudent = () => {
        this.setState({
            showSearchResult: true
        })

        //call redux
    }

    render() {
        return (
            <div className="operator-enrollment-container">
                <div className="operator-search-container">
                    <div style={{ padding: '10px' }}>
                        <div className="inline-container">
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
                        <Button onClick={this.showWithdraw} color="primary" variant="contained" label="Submit">Dosare retrase</Button>
                    </div>
                    <br />
                    {this.state.showSearchResult ? <StudentProfile /> : <PageableList/>}
                </div>
            </div>
        )
    }
}

export default OperatorEnrollment;