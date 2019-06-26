import React, { Component } from 'react';
import "./index.css";
import StudentProfile from '../../student/studentProfile';
import SearchBar from 'material-ui-search-bar'
import PageableList from '../../../dumb/pageableList';

class AdminSearch extends Component {

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
            <div className="admin-search-container">
                <SearchBar
                    placeholder="Caută după număr de ordine sau CNP"
                    onChange={this.updateValue}
                    onRequestSearch={this.searchStudent}
                    style={{
                        margin: '0 auto',
                        height: '80%',
                        width: '70%'
                    }}
                />
                <br />
                {this.state.showSearchResult ? <StudentProfile /> : <PageableList />}
            </div>
        )
    }
}

export default AdminSearch;