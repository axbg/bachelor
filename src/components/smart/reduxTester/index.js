import React, { Component } from 'react';
import { connect } from 'react-redux';
import { simpleAction } from '../../../actions/simpleAction';

class ReduxTester extends Component {

    render() {
        console.log(this.props.result);
        return (
            <button onClick={() => this.props.simpleAction()}>Click me</button>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction())
});

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTester);