import React, { Component } from 'react';
import StudentProfile from '../../student/studentProfile';
import SearchBar from 'material-ui-search-bar'

class VolunteerGenerateOrderNumber extends Component {
    searchStudent = () => {

    }

    render() {
        return (
            <div >
                <div>
                    <div style={{ padding: '10px' }}>
                        <div className="inline-container">
                            <SearchBar
                                placeholder="Număr de ordine/CNP"
                                onChange={this.updateValue}
                                onRequestSearch={this.searchStudent}
                                style={{
                                    margin: '0 auto',
                                    height: '80%'
                                }}
                            />
                        </div>
                    </div>
                    <br />
                    <StudentProfile />
                </div>
            </div>
        )
    }
}

export default VolunteerGenerateOrderNumber;