import React, { Component } from 'react';
import "./index.css";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class NavigationBar extends Component {
    render() {
        return (
            <div >
                <AppBar color="primary" position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            flow
                        </Typography>
                        <div className="flex-grow" />
                        <div className="nav-options">
                            {this.props.options.map((option, key) =>
                                <Button color="inherit" key={key} href={option.link}>
                                    {option.title}
                                </Button>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default NavigationBar;