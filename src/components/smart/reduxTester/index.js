import React, { Component } from 'react';
import { connect } from 'react-redux';
import { simpleAction } from '../../../actions/simpleAction';

class ReduxTester extends Component {
    render() {
        console.log(this.props.testLoaded);
        return (
            <button onClick={() => this.props.simpleAction(5)}>Click me</button>
        );
    }
}

const mapStateToProps = ({ simpleReducer }) => ({
    ...simpleReducer
});

const mapDispatchToProps = { simpleAction };

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTester);