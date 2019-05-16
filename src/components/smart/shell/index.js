import React, { Component } from 'react';
import "./index.css";
import NavigationBar from '../../dumb/navigationBar';
import Container from '../../dumb/container';
import { USER_ROLES, STUDENT_NAVIGATION_OPTIONS } from '../../../constants/index';
import { connect } from 'react-redux';
import { authenticate } from '../../../reducers/authReducer';
import { mobileLayout } from '../../../reducers/shellReducer';
import Spinner from '../../dumb/spinner/index';
import Footer from '../../dumb/footer';
import BottomNavigationBar from '../../dumb/bottomNavigationBar';
import ReactResizeDetector from 'react-resize-detector';


//will be changed based on user role
//this will retrieve from back-end what navigation tabs should be displayed
//this also will retrieve user data such as role
class Shell extends Component {

    componentDidMount() {
        this.props.authenticate();
    }

    onResize = (width, height) => {
        if (width < 620 && !this.props.mobileDevice) {
            this.props.mobileLayout(true);
        } else if (width >= 640 && this.props.mobileDevice) {
            this.props.mobileLayout(false);
        }
    }


    //add the rest of nav options for each role
    getNavigationOptions() {
        switch (this.props.role) {
            case USER_ROLES.STUDENT:
                return STUDENT_NAVIGATION_OPTIONS;
            case USER_ROLES.ADMIN:
            case USER_ROLES.VOLUNTEER:
            case USER_ROLES.CASHIER:
            case USER_ROLES.OPERATOR:
            default:
                return STUDENT_NAVIGATION_OPTIONS;
        }
    }

    render() {
        return (
            <div className="max-height">
                {
                    this.props.loaded ?
                        (<div className="max-height">
                            <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
                            {
                                this.props.mobileDevice ? ""
                                    : <NavigationBar position="fixed" options={this.getNavigationOptions()} />
                            }
                            <Container role={this.props.role} />
                            {
                                !this.props.mobileDevice ? ""
                                    : 
                                    <div className="fix-bottom"><BottomNavigationBar options={this.getNavigationOptions()} /> </div> 
                            }
                        </div>
                        )
                        :
                        <Spinner />
                }
            </div>
        )
    }
}

const mapStateToProps = ({ shellReducer, authReducer }) => ({
    role: authReducer.role,
    loaded: authReducer.loaded,
    mobileDevice: shellReducer.mobileDevice
});

const mapDispatchToProps = { authenticate, mobileLayout };

export default connect(mapStateToProps, mapDispatchToProps)(Shell);