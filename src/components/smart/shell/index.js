import React, { Component } from 'react';
import "./index.css";
import NavigationBar from '../../dumb/navigationBar';
import Container from '../../dumb/container';
import { USER_ROLES, NAVIGATION_OPTIONS } from '../../../constants/index';
import { connect } from 'react-redux';
import { getId } from '../../../reducers/shellReducer';

//will be changed based on user role
//this will retrieve from back-end what navigation tabs should be displayed
//this also will retrieve user data such as role


class Shell extends Component {

    componentDidMount() {
        
    }

    getNavigationOptions() {
        switch(this.props.role) {
            case USER_ROLES.STUDENT:
            case USER_ROLES.ADMIN:
            case USER_ROLES.VOLUNTEER:
            case USER_ROLES.CASHIER:
            case USER_ROLES.OPERATOR:
            default:
                return NAVIGATION_OPTIONS;
        }
    }

    render() {
        return (
            <div className="max-height">
                {
                    this.props.loaded ?
                        (<div className="max-height">
                            <NavigationBar position="static" options={this.getNavigationOptions()} />
                            <Container />
                        </div>
                        )
                        :
                        <p>not loaded yet</p>
                }
            </div>
        )
    }
}

const mapStateToProps = ({ shellReducer, authReducer }) => ({
    shell: shellReducer,
    role: authReducer.role,
    loaded: authReducer.loaded
});

const mapDispatchToProps = { getId };

export default connect(mapStateToProps, mapDispatchToProps)(Shell);