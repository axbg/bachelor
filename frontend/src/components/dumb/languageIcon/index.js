import React, { Component } from 'react';

class LanguageIcon extends Component {
    changeLanguage = () => {
        console.log("changing language");
    }

    render() {
        return (
            this.props.language === "RO" ?
                <img src="/ro.png" width="30" height="30" onClick={this.changeLanguage} className="student-profile-icon"
                    alt="RO_FLAG" style={{ cursor: "pointer" }} />
                : <img src="/en.png" width="30" height="30" onClick={this.changeLanguage} className="student-profile-icon"
                    alt="EN_FLAG" style={{ cursor: "pointer" }} />
        );
    }
}

export default LanguageIcon;