import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeCheckout from '../stripeCheckout';
import { STRIPE_SECRET } from '../../../constants';

class CheckoutForm extends Component {
  render() {
    return (
      <StripeProvider apiKey={STRIPE_SECRET}>
        <div className="example">
          <h3>Achizitionare: {this.props.numberOfCredits} credite</h3>
          <h3>Total de plată: {1000 * this.props.numberOfCredits}</h3>
          <div>
            <Elements>
              <StripeCheckout email={this.props.email} id={this.props.id}
                amount={1000 * this.props.numberOfCredits} buyCredits={this.props.buyCredits} />
            </Elements>
          </div>
        </div>
      </StripeProvider>
    );
  }
}

export default CheckoutForm;
