import React, { Component } from 'react';
import "./index.css";
import NavigationBar from '../../dumb/navigationBar';
import Container from '../../dumb/container';
import { connect } from 'react-redux';
import { simpleAction } from '../../../actions/simpleAction';

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

    constructor(props) {
        super(props);

        //will be part of props
        this.state = {
            loaded: true
        };
    }

    render() {
        return (
            <div className="max-height">
                {
                    this.state.loaded ?
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

export default Shell;

/*
const mapStateToProps = ({ simpleReducer }) => ({
    ...simpleReducer
});

const mapDispatchToProps = { simpleAction };

export default connect(mapStateToProps, mapDispatchToProps)(Shell);
*/