import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeCheckout from '../stripeCheckout/index';

class CheckoutForm extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <StripeProvider apiKey="pk_test_dsuHAmED8s3fhu1YtpX6DTpV00A4z6UHTo">
        <div className="example">
          <h1>Admitere ASE 2019</h1>
          <h3>Achizitionare: {this.props.numberOfCredits} credite</h3>
          <h3>Total de plată: {50 * this.props.numberOfCredits}</h3>
          <Elements>
            <StripeCheckout email={this.props.email} id={this.props.id} amount={50 * this.props.numberOfCredits} buyCredits={this.props.buyCredits} />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default CheckoutForm;