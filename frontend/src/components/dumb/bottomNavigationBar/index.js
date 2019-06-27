
import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Home, Restore, LocationOn, AccountCircle, Assignment, CheckCircle,  Place } from '@material-ui/icons';
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
    switch (icon) {
      case "home":
        return <Home />
      case "location":
        return <LocationOn />
      case "profile":
        return <AccountCircle />
      case "option":
        return <Assignment />
      case "check":
        return <CheckCircle />
      case "position":
        return <Place />  
      default:
        return <Restore />
    }
  }

  findCurrentLocation(location, options) {
    return options.filter((option) => option.link === location.pathname);
  }

  componentDidMount() {
    setTimeout(() => {
      const value = this.findCurrentLocation(this.props.location, this.props.options)[0].index;
      this.setState({
        value: value
      })
    }, 10);
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
            icon={this.renderIcon(option.icon)} />
        })}
      </BottomNavigation>
    );
  }
}

export default withRouter(BottomNavigationBar);