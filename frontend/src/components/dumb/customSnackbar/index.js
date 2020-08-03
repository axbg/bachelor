import React, { Component } from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/icons/Close";
import CloseIcon from '@material-ui/icons/Close';

class CustomSnackbar extends Component {
    state = {
        open: false,
    };

    componentDidMount() {
        this.setState({
            open: this.props.opened
        })
    }

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                onClose={this.handleClose}
                autoHideDuration={2000}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">You don't have sufficient authority to do this.</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        style={{ cursor: "pointer" }}
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        );
    }
}

export default CustomSnackbar;