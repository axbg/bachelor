import React, { Component } from 'react';
import "./index.css";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class NavigationBar extends Component {
    render() {
        return (
            <AppBar color="primary" position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        <Link to="/" className="nav-link">
                                <img src="/logo_transparent.png" className="nav-logo" alt="logo" />
                        </Link>
                    </Typography>
                    <div className="flex-grow" />
                    <div className="nav-options">
                        {this.props.options.map((option, key) =>
                            <Link to={option.link} className="nav-link" key={key}>
                                <Button color="inherit" key={key}>
                                    {option.title}
                                </Button>
                            </Link>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavigationBar;