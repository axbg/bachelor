import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class StripeCheckout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stripeToken: "tok_visa",
            stripeTokenType: "card",
            price: 50
        }

        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.setState({
            stripeEmail: this.props.email,
            studentId: this.props.id
        })
    }

    submit() {
        this.props.buyCredits({
            stripeToken: this.state.stripeToken, stripeTokenType: this.state.stripeTokenType,
            stripeEmail: this.props.email, amount: this.props.amount, studentId: this.props.id
        });
    }

    render() {
        return (
            <div className="checkout">
                <p>Dorești să efectuezi tranzacția?</p>
                <CardElement />
                <button onClick={this.submit}>Cumpără</button>
            </div>
        );
    }
}

export default injectStripe(StripeCheckout);