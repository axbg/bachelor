import React, { Component } from 'react';
import "./index.css";
import Credits from '../../../dumb/credits';
import { connect } from 'react-redux';
import { getFormattedOptions, addOption, deleteOption, buyCredits } from '../../../../reducers/studentReducer';

class StudentCredits extends Component {

    componentDidMount() {
        if (!this.props.formattedOptions) {
            this.props.getFormattedOptions();
        }
    }

    render() {
        return (
            <div className="student-info">
                <div className="student-options">
                    <h1>Credite & Facultate</h1>
                    {
                        this.props.formattedOptions ?
                            <Credits role={this.props.student.role} student={this.props.student} options={this.props.formattedOptions}
                                addOption={this.props.addOption} deleteOption={this.props.deleteOption}
                                buyCredits={this.props.buyCredits} />
                            : ""
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ studentReducer }) => ({
    role: studentReducer.role,
    student: studentReducer,
    formattedOptions: studentReducer.formattedOptions
});

const mapDispatchToProps = { getFormattedOptions, addOption, deleteOption, buyCredits };

export default connect(mapStateToProps, mapDispatchToProps)(StudentCredits);