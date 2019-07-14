import React, { Component } from 'react';
import "./index.css";
import StudentProfile from '../../student/studentProfile';
import SearchBar from 'material-ui-search-bar'
import { connect } from 'react-redux';
import Spinner from '../../../dumb/spinner/index';
import { toastr } from 'react-redux-toastr';
import { loadStudentData } from '../../../../reducers/volunteerReducer';

class AdminSearch extends Component {

    constructor() {
        super();
        this.state = {
            searchText: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.notFound) {
            toastr.error("Candidatul nu a fost găsit")
        }
    }

    updateSearchText(e) {
        this.setState({
            searchText: e
        })
    }

    searchStudent() {
        this.props.loadStudentData(this.state.searchText);
    }

    render() {
        return (
            <div >
                <div>
                    <div style={{ padding: '10px' }}>
                        <div className="inline-container">
                            <SearchBar
                                placeholder="Număr de ordine/CNP"
                                value={this.state.searchText}
                                onChange={(e) => this.updateSearchText(e)}
                                onRequestSearch={() => this.searchStudent()}
                                style={{
                                    margin: '0 auto',
                                    height: '80%'
                                }}
                            />
                        </div>
                    </div>
                    <br />
                    {this.props.searchLoading ?
                        <Spinner />
                        : (Object.keys(this.props.student).length !== 0 ?
                            < StudentProfile />
                            : <div>
                                <h1>Bună, {this.props.user.username}</h1>
                                <h3>Poți căuta un candidat folosind CNP-ul sau numărul de ordine al acestuia, urmat de tasta Enter.</h3>
                                <h2>Să începem!</h2>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ volunteerReducer }) => ({
    user: volunteerReducer.volunteer,
    student: volunteerReducer.student,
    searchLoading: volunteerReducer.searchLoading,
    notFound: volunteerReducer.notFound
});

const mapDispatchToProps = { loadStudentData };

export default connect(mapStateToProps, mapDispatchToProps)(AdminSearch);