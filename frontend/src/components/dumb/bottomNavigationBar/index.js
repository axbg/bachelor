
import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import { Link, withRouter } from 'react-router-dom';
import "./index.css";

class BottomNavigationBar extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  renderIcon = (icon) => {
    return <RestoreIcon />
  }

  findCurrentLocation(location, options) {
    return options.filter((option, index) => option.link === location.pathname);
  }

  componentDidMount() {
    const value = this.findCurrentLocation(this.props.location, this.props.options)[0].index;
    this.setState({
      value: value
    })
  }

  render() {
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
      >
        {this.props.options.map((option, key) => {
          return <BottomNavigationAction
            key={key}
            component={Link}
            to={option.link}
            label={option.shortTitle}
            icon={this.renderIcon(option.title)} />
        })}
      </BottomNavigation>
    );
  }
}

export default withRouter(BottomNavigationBar);