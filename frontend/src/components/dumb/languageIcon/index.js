import React, { Component } from 'react';

//connect this to redux store to change current language
//props will be received directly form the store
class LanguageIcon extends Component {

    constructor(props) {
        super(props);
    }

    changeLanguage = () => {
        console.log("changing language");
    }

    render() {
        return (
            this.props.language === "RO" ?
                <img src="/ro.png" width="30" height="30" onClick={this.changeLanguage} className="student-profile-icon" />
                : <img src="/en.png" width="30" height="30" onClick={this.changeLanguage} className="student-profile-icon" />
        );
    }
}

export default LanguageIcon;