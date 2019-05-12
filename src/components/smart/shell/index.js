import React, { Component } from 'react';
import "./index.css";
import NavigationBar from '../../dumb/navigationBar';
import Container from '../../dumb/container';
import { connect } from 'react-redux';
import { getId } from '../../../reducers/shellReducer';

//will be changed based on user role
const navigationBarOptions = [
    {
        title: "Home",
        link: "/home"
    },
    {
        title: "Profile",
        link: "/profile"
    },
    {
        title: "Registration Day",
        link: "/registration-day"
    },
    {
        title: "Credits and Faculties",
        link: "/credits"
    },
    {
        title: "Logout",
        link: "/logout"
    }
]

class Shell extends Component {

    render() {
        return (
            <div className="max-height">
                {
                    this.props.loaded ?
                        (<div className="max-height">
                            <NavigationBar position="static" options={navigationBarOptions} />
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

const mapStateToProps = ({ shellReducer }) => ({
    ...shellReducer
});

const mapDispatchToProps = { getId };

export default connect(mapStateToProps, mapDispatchToProps)(Shell);