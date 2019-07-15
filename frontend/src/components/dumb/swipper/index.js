import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "../../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css"

class Swipper extends Component {

  componentDidMount() {
    //get current position from redux and set it as itemSelected value for Carousel
  }

  itemChanged(e) {
    //save current position inside redux
  }

  render() {
    return (
      <Carousel emulateTouch showThumbs={false} showStatus={false}  onChange={this.itemChanged}>
        <div>
          <img alt="img" src="/step1.png"/>
        </div>
        <div>
          <img alt="img" src="/step2.png" />
        </div>
        <div>
          <img alt="img" src="/step3.png " />
        </div>
        <div>
          <img alt="img" src="/step4.png " />
        </div>
        <div>
          <img alt="img" src="/step5.png " />
        </div>
      </Carousel>
    );
  }


}

export default Swipper;